import { useParams } from 'react-router';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss'
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { EmptyQuestions } from '../components/EmptyQuestions';
import { Header } from '../components/Header';


type RoomParams = {
  id: string;
}

export function AdminRoom(){;
  const params = useParams<RoomParams>();
  const history = useHistory();
  const { questions, title } = useRoom(params.id);

  async function handleEndRoom() {
    await database.ref(`rooms/${params.id}`).update({
      closedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que você deseja excluir essa pergunta?')){
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string){
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return(
    <div id="page-room">
      <Header>
        <RoomCode code={params.id}/>
        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
      </Header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        
        <div className="question-list">
          {questions.length === 0 && <EmptyQuestions text="Envie o código desta sala para seus amigos e comece a responder perguntas!"/>}
          {questions.map(question => {
            return <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted} >
              {!question.isAnswered && (
                <>
                <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                <img src={checkImg} alt="Marcar pergunta como respondida" />
              </button>
              <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                <img src={answerImg} alt="Dar destaque à pergunta" />
              </button>
              </>
              )}
              <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          })}
        </div>
      </main>
    </div>
  )
}