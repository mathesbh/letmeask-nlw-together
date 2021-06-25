import emptyQuestionsImg from '../assets/images/empty-questions.svg';
import '../styles/empty-questions.scss';

export function EmptyQuestions() {
  return (
    <div className="empty-questions">
      <img src={emptyQuestionsImg} alt="Nenhuma pergunta para responder" />
      <footer>
        <strong>Nenhuma pergunta por aqui...</strong>
        <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
      </footer>
    </div>
  )
}