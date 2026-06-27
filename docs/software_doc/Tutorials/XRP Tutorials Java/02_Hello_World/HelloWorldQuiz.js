import React, { useState } from 'react';

const questions = [
  {
    question: 'What will the following code print to the console?',
    code: 'System.out.println("Go Argos!");',
    choices: [
      'System.out.println',
      'Go Argos!',
      '"Go Argos!"',
      'Nothing — it has an error',
    ],
    correctIndex: 1,
    explanation:
      'println prints whatever is inside the quotes. The quotes themselves are not printed — only the text between them.',
  },
  {
    question: 'What does "println" mean?',
    code: null,
    choices: [
      'Print line — prints the text and moves to a new line',
      'Print and loop — repeats the message',
      'Print long — handles messages over 10 characters',
      'Print less — a shorter version of print',
    ],
    correctIndex: 0,
    explanation:
      '"println" is short for "print line." It prints your text and then moves the cursor to the next line, so the next output starts fresh.',
  },
  {
    question: 'Why does this statement end with a semicolon?',
    code: 'System.out.println("Hello, World!");',
    choices: [
      'It closes the parentheses',
      'It is optional and only used sometimes',
      'It marks the end of a statement — every Java statement requires one',
      'It tells Java to print a new line',
    ],
    correctIndex: 2,
    explanation:
      'In Java, every statement must end with a semicolon. Think of it like a period at the end of a sentence — it tells Java where the instruction stops.',
  },
];

const COLORS = {
  correct: 'var(--ifm-color-success)',
  wrong: 'var(--ifm-color-danger)',
  neutral: 'var(--ifm-color-emphasis-300)',
  text: 'var(--ifm-color-content)',
  bg: 'var(--ifm-background-surface-color)',
  codeBg: 'var(--ifm-code-background)',
};

function Question({ q, index }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;

  return (
    <div
      style={{
        marginBottom: '2em',
        padding: '1.25em 1.5em',
        border: `1px solid ${COLORS.neutral}`,
        borderRadius: '8px',
        background: COLORS.bg,
      }}
    >
      <p style={{ fontWeight: 'bold', marginBottom: '0.5em', color: COLORS.text }}>
        Question {index + 1}: {q.question}
      </p>

      {q.code && (
        <pre
          style={{
            background: COLORS.codeBg,
            padding: '0.75em 1em',
            borderRadius: '6px',
            fontSize: '0.95em',
            marginBottom: '1em',
            overflowX: 'auto',
          }}
        >
          <code>{q.code}</code>
        </pre>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
        {q.choices.map((choice, i) => {
          let borderColor = COLORS.neutral;
          let bgColor = 'transparent';
          if (answered) {
            if (i === q.correctIndex) {
              borderColor = COLORS.correct;
              bgColor = 'rgba(0,200,83,0.08)';
            } else if (i === selected) {
              borderColor = COLORS.wrong;
              bgColor = 'rgba(255,50,50,0.08)';
            }
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              style={{
                textAlign: 'left',
                padding: '0.6em 1em',
                border: `2px solid ${borderColor}`,
                borderRadius: '6px',
                background: bgColor,
                cursor: answered ? 'default' : 'pointer',
                color: COLORS.text,
                fontSize: '1em',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <strong>{String.fromCharCode(65 + i)})</strong> {choice}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          style={{
            marginTop: '1em',
            padding: '0.75em 1em',
            borderRadius: '6px',
            background:
              selected === q.correctIndex
                ? 'rgba(0,200,83,0.1)'
                : 'rgba(255,50,50,0.1)',
            borderLeft: `4px solid ${
              selected === q.correctIndex ? COLORS.correct : COLORS.wrong
            }`,
            color: COLORS.text,
          }}
        >
          {selected === q.correctIndex ? '✅ Correct! ' : '❌ Not quite. '}
          {q.explanation}
        </div>
      )}
    </div>
  );
}

export default function HelloWorldQuiz() {
  return (
    <div style={{ margin: '1.5em 0' }}>
      {questions.map((q, i) => (
        <Question key={i} q={q} index={i} />
      ))}
    </div>
  );
}
