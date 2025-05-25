import { useState } from "react";

/**
 * Quiz Component - A React component that implements a multiple-choice quiz interface
 * 
 * @component
 * @example
 * return (
 *   <Quiz />
 * )
 * 
 * @description
 * The Quiz component manages a set of questions with multiple-choice answers.
 * It features navigation between questions, answer selection, and score tracking.
 * 
 * State:
 * - userAnswers: Array storing user's selected answers
 * - currentQuestion: Number indicating the current question index
 * 
 * Features:
 * - Question navigation (Previous/Next)
 * - Answer selection
 * - Score calculation
 * - Progress tracking
 * 
 * Props: None
 * 
 * @returns {JSX.Element} A quiz interface with questions, options, navigation, and score display
 * 
 * Key Functions:
 * @function handleSelectOption - Handles user's answer selection
 * @function goprev - Navigates to previous question
 * @function gonext - Navigates to next question
 * @function score - Calculates total correct answers
 */
function Quiz() {
    const questionBank = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter",
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe", "Pb"],
            answer: "Au",
        },
    ];
    const initialAnswers = [null, null, null];
    const [userAnswers, setAnswers] = useState(initialAnswers);
    const [currentQuestion, setCurrentQuestion] = useState(0);


    function handleSelectOption(option) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;
        setAnswers(newUserAnswers);

    }



    function goprev() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }
    function gonext() {
        if (currentQuestion < questionBank.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const score = userAnswers.reduce((acc, answer, index) => {
        if (answer === questionBank[index].answer) {
            return acc + 1;
        }
        return acc;
    }
        , 0);

    const result = userAnswers.every((answer, index) => answer === questionBank[index].answer);

    

    return (
        <div className="quiz-container">
            <h2>Question {currentQuestion + 1}</h2>
            <p className="question">{questionBank[currentQuestion].question}</p>

            <div className="options-container">
                {questionBank[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        className="option"
                        onClick={() => handleSelectOption(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="selected-answer">
                <p>Your answer: {userAnswers[currentQuestion] || "Not answered"}</p>
            </div>

            <div className="nav-buttons">
                <button onClick={goprev}>Previous</button>
                <button onClick={gonext}>Next</button>
            </div>

            <div className="progress">
                <p>
                    Question {currentQuestion + 1} of {questionBank.length}
                </p>
          
            {currentQuestion === questionBank.length - 1 && (
                <button onClick={() => alert(`Your score is ${score} out of ${questionBank.length}`)}>
                    Submit Quiz
                </button>
            )}
            </div>
            <div className="score-display">
                <p>Score: {score} out of {questionBank.length}</p>  
            </div>
            {/* Display the result after quiz completion */}
            {result && (
                <div className="result-message">
                    <p>Congratulations! You answered all questions correctly!</p>
                </div>
            )}
            
        </div>
    );
}


export default Quiz;








