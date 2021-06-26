import emptyQuestionsImg from '../assets/images/empty-questions.svg';
import '../styles/empty-questions.scss';


type EmptyQuestionsProps ={
  text: string;
}

export function EmptyQuestions({ text } : EmptyQuestionsProps) {
  return (
    <div className="empty-questions">
      <img src={emptyQuestionsImg} alt="Nenhuma pergunta para responder" />
      <footer>
        <strong>Nenhuma pergunta por aqui...</strong>
        <p>{text}</p>
      </footer>
    </div>
  )
}