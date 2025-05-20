"use client";
import React from "react";

import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, RotateCw, Trophy, BookOpen } from "lucide-react";
import Header from "@/components/header";

export default function IslamicQuiz() {
    // Quiz state
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [timerActive, setTimerActive] = useState(false);
    type UserAnswer = {
        questionIndex: number;
        selectedAnswer: number | null;
        isCorrect: boolean;
    };
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [shuffledQuestions, setShuffledQuestions] = useState<typeof quizQuestions>([]);

    // Quiz questions bank
    const quizQuestions = [
        {
            question: "Which is the first pillar of Islam?",
            options: [
                "Salah (Prayer)",
                "Shahadah (Declaration of Faith)",
                "Sawm (Fasting)",
                "Zakat (Charity)"
            ],
            correctAnswer: 1,
            explanation: "The first pillar of Islam is the Shahadah (Declaration of Faith), which is the sincere declaration that there is no god but Allah and Muhammad is the messenger of Allah."
        },
        {
            question: "How many chapters (surahs) are in the Quran?",
            options: ["114", "124", "110", "120"],
            correctAnswer: 0,
            explanation: "The Holy Quran consists of 114 chapters (surahs) of varying lengths."
        },
        {
            question: "Which battle is known as the 'Decisive Battle' in Islamic history?",
            options: ["Battle of Uhud", "Battle of Badr", "Battle of Khandaq", "Battle of Tabuk"],
            correctAnswer: 1,
            explanation: "The Battle of Badr (17 Ramadan, 2 AH) is known as the 'Decisive Battle' as it was the first major battle between Muslims and the Quraysh of Mecca, resulting in a significant victory for Muslims despite being outnumbered."
        },
        {
            question: "Which of these is NOT one of the four Rightly Guided Caliphs?",
            options: ["Abu Bakr", "Umar ibn Al-Khattab", "Uthman ibn Affan", "Muawiyah ibn Abi Sufyan"],
            correctAnswer: 3,
            explanation: "The four Rightly Guided Caliphs (Khulafa e Rashidun) were Abu Bakr, Umar ibn Al-Khattab, Uthman ibn Affan, and Ali ibn Abi Talib. Muawiyah ibn Abi Sufyan was the founder of the Umayyad Caliphate that followed."
        },
        {
            question: "Which angel was responsible for revealing the Quran to Prophet Muhammad (ﷺ)?",
            options: ["Jibreel (Gabriel)", "Mikail (Michael)", "Israfil", "Izrail"],
            correctAnswer: 0,
            explanation: "Angel Jibreel (Gabriel) was responsible for delivering the revelations of the Quran to Prophet Muhammad (ﷺ) over a period of 23 years."
        },
        {
            question: "Which month in the Islamic calendar is known for fasting?",
            options: ["Rajab", "Shaban", "Ramadan", "Dhul Hijjah"],
            correctAnswer: 2,
            explanation: "Ramadan is the ninth month of the Islamic calendar and is observed by Muslims worldwide as a month of fasting (sawm), prayer, reflection and community."
        },
        {
            question: "How many times a day do Muslims perform obligatory prayers (Salah)?",
            options: ["Three", "Four", "Five", "Six"],
            correctAnswer: 2,
            explanation: "Muslims perform obligatory prayers (Salah) five times a day: Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night)."
        },
        {
            question: "The Night of Power (Laylat al-Qadr) occurs in which month?",
            options: ["Ramadan", "Shaban", "Dhul Hijjah", "Muharram"],
            correctAnswer: 0,
            explanation: "Laylat al-Qadr (The Night of Power) occurs in the month of Ramadan. It is considered the holiest night of the year, described in the Quran as 'better than a thousand months'."
        },
        {
            question: "Which city is known as the 'City of the Prophet'?",
            options: ["Mecca", "Medina", "Jerusalem", "Damascus"],
            correctAnswer: 1,
            explanation: "Medina is known as 'Madinat al-Nabi' or 'City of the Prophet' because it was where Prophet Muhammad (ﷺ) migrated to and established the first Muslim community."
        },
        {
            question: "What is the name of Prophet Muhammad's (ﷺ) first wife?",
            options: ["Aisha", "Khadijah", "Hafsa", "Safiyyah"],
            correctAnswer: 1,
            explanation: "Khadijah bint Khuwaylid was the first wife of Prophet Muhammad (ﷺ). She was the first person to convert to Islam and supported the Prophet throughout his early mission."
        },
        {
            question: "Which of the following is NOT one of the Books of Allah mentioned in the Quran?",
            options: ["Tawrat (Torah)", "Zabur (Psalms)", "Injil (Gospel)", "Kitab al-Hikma (Book of Wisdom)"],
            correctAnswer: 3,
            explanation: "The Quran mentions four revealed books: Tawrat (Torah) given to Prophet Musa (Moses), Zabur (Psalms) given to Prophet Dawud (David), Injil (Gospel) given to Prophet Isa (Jesus), and the Quran given to Prophet Muhammad (ﷺ). 'Kitab al-Hikma' is not mentioned as a revealed book."
        },
        {
            question: "What is the penalty for missing a fast in Ramadan without a valid reason?",
            options: ["No penalty, just make up the fast", "Make up the fast and feed 60 poor people", "Make up the fast and fast for an additional 10 days", "Make up the fast and feed one poor person for each day missed"],
            correctAnswer: 1,
            explanation: "The penalty (kaffarah) for deliberately breaking a Ramadan fast without a valid reason is to free a slave (which is not applicable today), or to fast for 60 consecutive days, or to feed 60 poor people."
        }
    ];

    // Shuffle array using Fisher-Yates algorithm
    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Start the quiz
    const startQuiz = () => {
        setIsQuizStarted(true);
        setIsQuizEnded(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setShuffledQuestions(shuffleArray(quizQuestions).slice(0, 8)); // Pick 8 random questions
        setTimer(30);
        setTimerActive(true);
    };

    // Handle answer selection
    const handleAnswerSelect = (answerIndex: number) => {
        if (!isAnswerSubmitted) {
            setSelectedAnswer(answerIndex);
        }
    };

    // Submit answer
    const submitAnswer = () => {
        if (selectedAnswer === null) return;

        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        // Update score if correct
        if (isCorrect) {
            setScore(score + 1);
        }

        // Track user answer
        setUserAnswers([...userAnswers, {
            questionIndex: currentQuestionIndex,
            selectedAnswer,
            isCorrect
        }]);

        setIsAnswerSubmitted(true);
        setTimerActive(false);
    };

    // Move to next question
    const nextQuestion = () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerSubmitted(false);
            setTimer(30);
            setTimerActive(true);
        } else {
            // End quiz if no more questions
            endQuiz();
        }
    };

    // End the quiz
    const endQuiz = () => {
        setIsQuizEnded(true);
        setTimerActive(false);
    };

    // Restart the quiz
    const restartQuiz = () => {
        startQuiz();
    };

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (timerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0 && !isAnswerSubmitted && isQuizStarted && !isQuizEnded) {
            // Auto-submit when timer runs out
            if (selectedAnswer !== null) {
                submitAnswer();
            } else {
                // If no answer selected, count as wrong
                setUserAnswers([...userAnswers, {
                    questionIndex: currentQuestionIndex,
                    selectedAnswer: null,
                    isCorrect: false
                }]);
                setIsAnswerSubmitted(true);
            }
            setTimerActive(false);
        }

        return () => clearInterval(interval);
    }, [timer, timerActive, isAnswerSubmitted]);

    // Current question data
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    return (
        <div>
            <Header />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {!isQuizStarted ? (
                    // Quiz intro screen
                    <div className="text-center bg-white dark:card-bg rounded-lg shadow-md p-8 border border-gray-100 dark:border-night-300">
                        <h1 className="text-3xl font-bold mb-6 dark:text-sand-200">Islamic Knowledge Quiz</h1>
                        <div className="mb-6">
                            <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-sand-700/20 flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-12 w-12 text-primary dark:text-sand-700" />
                            </div>
                            <p className="text-lg dark:text-sand-300 mb-4">Test your knowledge of Islamic history, Quran, Hadith, and practices.</p>
                            <ul className="text-left max-w-md mx-auto mb-6 space-y-2 dark:text-sand-400">
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 text-primary dark:text-sand-700" />
                                    <span>8 randomly selected questions</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 text-primary dark:text-sand-700" />
                                    <span>30 seconds per question</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 text-primary dark:text-sand-700" />
                                    <span>Detailed explanations for each answer</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 text-primary dark:text-sand-700" />
                                    <span>Track your progress and learning</span>
                                </li>
                            </ul>
                        </div>
                        <button
                            onClick={startQuiz}
                            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:btn-primary dark:focus:ring-sand-600"
                        >
                            Start Quiz
                        </button>
                    </div>
                ) : isQuizEnded ? (
                    // Quiz results screen
                    <div className="bg-white dark:card-bg rounded-lg shadow-md p-6 border border-gray-100 dark:border-night-300">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 rounded-full bg-primary/10 dark:bg-sand-700/20 flex items-center justify-center mx-auto mb-4">
                                <Trophy className="h-10 w-10 text-primary dark:text-sand-700" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 dark:text-sand-200">Quiz Completed!</h2>
                            <p className="text-lg dark:text-sand-300">
                                Your score: <span className="font-bold">{score}</span> out of {shuffledQuestions.length}
                            </p>
                            <div className="mt-4">
                                <div className="w-full bg-gray-200 dark:progress-bg rounded-full h-4 mb-2">
                                    <div
                                        className="bg-primary dark:progress-fill h-4 rounded-full"
                                        style={{ width: `${(score / shuffledQuestions.length) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-sand-400">
                                    {Math.round((score / shuffledQuestions.length) * 100)}% Correct
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 dark:text-sand-300">Your Answers</h3>
                            <div className="space-y-4">
                                {userAnswers.map((answer, index) => {
                                    const question = shuffledQuestions[answer.questionIndex];
                                    return (
                                        <div key={index} className="p-4 bg-gray-50 dark:bg-night-300 rounded-lg">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 mr-3 mt-1">
                                                    {answer.isCorrect ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-red-500" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium dark:text-sand-300">Q{index + 1}: {question.question}</p>
                                                    <p className="mt-1 text-sm dark:text-sand-400">
                                                        Your answer: <span className={answer.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                                                            {answer.selectedAnswer !== null ? question.options[answer.selectedAnswer] : "Time expired"}
                                                        </span>
                                                    </p>
                                                    {!answer.isCorrect && (
                                                        <div className="mt-2">
                                                            <p className="text-sm font-medium text-gray-600 dark:text-sand-400">
                                                                Correct answer: <span className="text-green-600 dark:text-green-400">{question.options[question.correctAnswer]}</span>
                                                            </p>
                                                            <p className="mt-1 text-sm text-gray-500 dark:text-sand-500 italic">{question.explanation}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={restartQuiz}
                                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:btn-primary dark:focus:ring-sand-600 inline-flex items-center"
                            >
                                <RotateCw className="h-4 w-4 mr-2" />
                                Take Quiz Again
                            </button>
                        </div>
                    </div>
                ) : (
                    // Active quiz question screen
                    <div className="bg-white dark:card-bg rounded-lg shadow-md border border-gray-100 dark:border-night-300">
                        {/* Quiz header */}
                        <div className="border-b border-gray-200 dark:border-night-300 p-4 flex justify-between items-center">
                            <div className="dark:text-sand-300">
                                Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-primary dark:text-sand-700" />
                                <span className={`font-medium ${timer <= 10 ? "text-red-500" : "dark:text-sand-300"}`}>
                                    {timer} seconds
                                </span>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-6 dark:text-sand-200">
                                {currentQuestion?.question}
                            </h2>

                            {/* Answer options */}
                            <div className="space-y-3 mb-6">
                                {currentQuestion?.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(index)}
                                        disabled={isAnswerSubmitted}
                                        className={`w-full text-left p-4 rounded-lg border transition-colors ${isAnswerSubmitted
                                            ? index === currentQuestion.correctAnswer
                                                ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-700"
                                                : selectedAnswer === index
                                                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-700"
                                                    : "border-gray-200 dark:border-night-300 bg-gray-50 dark:bg-night-300"
                                            : selectedAnswer === index
                                                ? "border-primary bg-primary/10 dark:border-sand-700 dark:bg-sand-700/20"
                                                : "border-gray-200 hover:border-gray-300 dark:border-night-300 dark:hover:border-night-200 bg-gray-50 dark:bg-night-300"
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`flex-shrink-0 h-5 w-5 rounded-full border ${isAnswerSubmitted
                                                ? index === currentQuestion.correctAnswer
                                                    ? "bg-green-500 border-green-500"
                                                    : selectedAnswer === index
                                                        ? "bg-red-500 border-red-500"
                                                        : "border-gray-400 dark:border-night-200"
                                                : selectedAnswer === index
                                                    ? "bg-primary border-primary dark:bg-sand-700 dark:border-sand-700"
                                                    : "border-gray-400 dark:border-night-200"
                                                } mr-3`}></div>
                                            <span className="dark:text-sand-300">{option}</span>
                                            {isAnswerSubmitted && index === currentQuestion.correctAnswer && (
                                                <CheckCircle className="h-5 w-5 ml-2 text-green-500" />
                                            )}
                                            {isAnswerSubmitted && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                                                <XCircle className="h-5 w-5 ml-2 text-red-500" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Explanation (shown after answering) */}
                            {isAnswerSubmitted && (
                                <div className="mb-6 p-4 bg-gray-50 dark:bg-night-300 border-l-4 border-primary dark:border-sand-700 rounded-r-md">
                                    <h3 className="font-medium dark:text-sand-300">Explanation:</h3>
                                    <p className="text-gray-600 dark:text-sand-400 mt-1">{currentQuestion?.explanation}</p>
                                </div>
                            )}

                            {/* Action buttons */}
                            <div className="flex justify-between">
                                {!isAnswerSubmitted ? (
                                    <button
                                        onClick={submitAnswer}
                                        disabled={selectedAnswer === null}
                                        className={`px-6 py-2 font-medium rounded-md transition-colors ${selectedAnswer === null
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-night-300 dark:text-sand-500"
                                            : "bg-primary hover:bg-primary/90 text-white dark:btn-primary"
                                            }`}
                                    >
                                        Submit Answer
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextQuestion}
                                        className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:btn-primary dark:focus:ring-sand-600"
                                    >
                                        {currentQuestionIndex < shuffledQuestions.length - 1 ? "Next Question" : "See Results"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}