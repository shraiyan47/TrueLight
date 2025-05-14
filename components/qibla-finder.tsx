"use client"

import { useState, useEffect, useRef } from "react"
import { Compass, MapPin, RotateCw, AlertCircle } from "lucide-react"

// Kaaba coordinates in Mecca
const KAABA_LAT = 21.4225
const KAABA_LNG = 39.8262

export default function QiblaFinder() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null)
  const [deviceOrientation, setDeviceOrientation] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null)
  const compassRef = useRef<HTMLDivElement>(null)

  // Request location permission and get current position
  const getLocation = async () => {
    setLoading(true)
    setError(null)

    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser")
      }

      // Request permission if needed
      if (navigator.permissions && navigator.permissions.query) {
        const permission = await navigator.permissions.query({ name: "geolocation" as PermissionName })
        setPermissionState(permission.state)

        permission.addEventListener("change", () => {
          setPermissionState(permission.state)
        })

        if (permission.state === "denied") {
          throw new Error("Location permission denied. Please enable location services.")
        }
      }

      // Get current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
          calculateQiblaDirection(latitude, longitude)
          setLoading(false)
        },
        (err) => {
          console.error("Error getting location:", err)
          setError(
            err.code === 1
              ? "Location permission denied. Please enable location services."
              : "Could not get your location. Please try again.",
          )
          setLoading(false)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    } catch (err) {
      console.error("Error in getLocation:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setLoading(false)
    }
  }

  // Calculate Qibla direction based on user's coordinates
  const calculateQiblaDirection = (lat: number, lng: number) => {
    try {
      // Convert to radians
      const latRad = (lat * Math.PI) / 180
      const lngRad = (lng * Math.PI) / 180
      const kaabaLatRad = (KAABA_LAT * Math.PI) / 180
      const kaabaLngRad = (KAABA_LNG * Math.PI) / 180

      // Calculate Qibla direction
      const y = Math.sin(kaabaLngRad - lngRad)
      const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad)
      let qibla = Math.atan2(y, x)

      // Convert to degrees
      qibla = (qibla * 180) / Math.PI

      // Normalize to 0-360
      qibla = (qibla + 360) % 360

      setQiblaDirection(qibla)
    } catch (err) {
      console.error("Error calculating Qibla direction:", err)
      setError("Error calculating Qibla direction. Please try again.")
    }
  }

  // Handle device orientation for compass
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Check if we have the alpha value (compass direction)
      if (event.alpha !== null) {
        setDeviceOrientation(event.alpha)
      }
    }

    // Request permission for device orientation if needed (iOS 13+)
    const requestOrientationPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission()
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true)
          } else {
            console.log("Device orientation permission denied")
          }
        } catch (err) {
          console.error("Error requesting device orientation permission:", err)
        }
      } else {
        // For devices that don't require permission
        window.addEventListener("deviceorientation", handleOrientation, true)
      }
    }

    // Only request orientation permission if we have location
    if (location) {
      requestOrientationPermission()
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true)
    }
  }, [location])

  // Rotate compass to point to Qibla
  useEffect(() => {
    if (compassRef.current && qiblaDirection !== null) {
      let rotation = qiblaDirection

      // If we have device orientation, adjust the rotation
      if (deviceOrientation !== null) {
        rotation = qiblaDirection - deviceOrientation
      }

      compassRef.current.style.transform = `rotate(${rotation}deg)`
    }
  }, [qiblaDirection, deviceOrientation])

  return (
    <section className="py-8 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold text-center mb-8 text-green-800 dark:text-green-400 transition-colors">
          Qibla Direction Finder
        </h2>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow border border-green-100 dark:border-green-900 overflow-hidden transition-colors">
          <div className="flex items-center gap-2 p-4 border-b border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-950/50 transition-colors">
            <Compass className="h-5 w-5 text-green-600 dark:text-green-500" />
            <h3 className="font-medium text-green-800 dark:text-green-400 transition-colors">Find Qibla Direction</h3>
          </div>

          <div className="p-6">
            {error ? (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-md text-red-700 dark:text-red-400 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            ) : null}

            {!location && !loading && !error ? (
              <div className="text-center mb-6">
                <p className="text-green-800 dark:text-green-400 mb-4 transition-colors">
                  To find the Qibla direction, we need your current location. Please click the button below to allow
                  location access.
                </p>
                <button
                  onClick={getLocation}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center gap-2 mx-auto"
                >
                  <MapPin className="h-4 w-4" />
                  Get My Location
                </button>
              </div>
            ) : null}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-500 mb-4"></div>
                <p className="text-green-800 dark:text-green-400 transition-colors">Getting your location...</p>
              </div>
            ) : null}

            {location && qiblaDirection !== null ? (
              <div className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-6">
                  {/* Compass background */}
                  <div className="absolute inset-0 rounded-full border-4 border-green-100 dark:border-green-900 transition-colors">
                    {/* Cardinal directions */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-green-800 dark:text-green-400 font-bold transition-colors">
                      N
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-green-800 dark:text-green-400 font-bold transition-colors">
                      S
                    </div>
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-green-800 dark:text-green-400 font-bold transition-colors">
                      W
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-green-800 dark:text-green-400 font-bold transition-colors">
                      E
                    </div>

                    {/* Degree markers */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-4 bg-green-200 dark:bg-green-800 transition-colors"
                        style={{
                          top: "50%",
                          left: "50%",
                          transformOrigin: "bottom center",
                          transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Qibla pointer */}
                  <div
                    ref={compassRef}
                    className="absolute inset-0 transition-transform duration-500 ease-in-out"
                    style={{ transformOrigin: "center center" }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[40px] border-l-transparent border-r-transparent border-b-green-600 dark:border-b-green-500 transition-colors"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-600 dark:bg-green-500 transition-colors"></div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md transition-colors">
                  <p className="text-green-800 dark:text-green-400 font-medium mb-2 transition-colors">
                    Qibla Direction: {Math.round(qiblaDirection)}° from North
                  </p>
                  <p className="text-green-700 dark:text-green-500 text-sm transition-colors">
                    Point your device toward this direction to face the Kaaba in Mecca.
                  </p>
                  {deviceOrientation === null && (
                    <p className="text-amber-600 dark:text-amber-400 text-sm mt-2 transition-colors">
                      Note: For a live compass, please hold your device flat and ensure compass access is enabled.
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    onClick={getLocation}
                    className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-800 dark:text-green-400 rounded-md transition-colors flex items-center gap-1 mx-auto"
                  >
                    <RotateCw className="h-4 w-4" />
                    Refresh Location
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-6 pt-6 border-t border-green-100 dark:border-green-900 transition-colors">
              <h4 className="font-medium text-green-800 dark:text-green-400 mb-2 transition-colors">How to Use:</h4>
              <ol className="list-decimal list-inside space-y-2 text-green-700 dark:text-green-500 text-sm transition-colors">
                <li>Allow location access when prompted</li>
                <li>Hold your device flat in your hand</li>
                <li>The arrow will point toward the Qibla direction</li>
                <li>
                  For the most accurate results, calibrate your device's compass by moving it in a figure-8 pattern
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
