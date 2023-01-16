import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Button,
  ButtonGroup,
  Select,
  Input,
} from '@chakra-ui/react'
import mount from './intervalScheduling';
import { GrAdd } from 'react-icons/gr';
import { AiOutlineUpload } from 'react-icons/ai';

function parseDay(day){
  var ret;

  switch (day) {
    case "segunda": ret = "0";
    break;
    case "terca": ret = "1";
    break;
    case "quarta": ret = "2";
    break;
    case "quinta": ret = "3";
    break;
    case "sexta": ret = "4";
    break;
    case "sabado": ret = "5";
    break;
    case "domingo": ret = "6";
    break;
    default: ret = null;
    break;
  }

  return ret;
}

export function ModalExample({activities, setActivities, setColumn}) {

  let currentActivity = {name: "", day: "", time: "", priority: ""}

// ----------------------

const reader = new FileReader();
reader.onload = e => {
  var lines = e.target.result.split('\n')

  for(const d of lines){
    
    if(!/^[a-zA-Z0-9 ]{1,20}:[a-zA-Z]{5,7}:\d{2}:[1-5]$/.test(d)) continue;

    var temp = d.split(':');
    

    currentActivity = { name: temp[0], day: parseDay(temp[1].toLowerCase()), time: temp[2], priority: temp[3]};
                                  
    addActivity();
  } 
}

const input = document.createElement("input");
input.type = "file";

input.onchange = e => {

  const file = e.target.files[0];
  reader.readAsText(file);
};

function handleButtonClick() {
  //setCurrentActivity({name: "", day: "", time: "", priority: ""})
  
  input.click();
};

// ----------------------

  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const criarGrid = () => {   
    
    setColumn(mount(activities));
  };

  function handleSelectDay(e) {
    currentActivity.day = e.target.value
  }

  function handleSelectTime(e) {
    currentActivity.time = e.target.value
  }

  function handleChangeName(e) {
    const { value } = e.target
    currentActivity.name = value
  }

  function handleChangePriority(e) {
    currentActivity.priority = e.target.value
  }

  function addActivity() {
    var aux = [...activities]
    aux[Number(currentActivity.priority) - 1].push(currentActivity);
    setActivities(aux);
    onClose()
  }

  return (
    <>
      <ButtonGroup variant='outline' spacing='6'>
        <Button leftIcon={<GrAdd />} colorScheme='teal' onClick={onOpen}>Adicionar Evento</Button>
        <Button leftIcon={<AiOutlineUpload />} colorScheme='teal' onClick={handleButtonClick}>Importar Eventos</Button>
        <Button colorScheme='blue' onClick={() => criarGrid()}>Montar Cronograma</Button>
      </ButtonGroup>     
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingX={"15px"} paddingY={"10px"}>
          <ModalHeader>Adicionar atividades</ModalHeader>
          <ModalCloseButton />
          <Input onChange={handleChangeName} marginY={"10px"} placeholder='Título'/>
          <Select id='day' onChange={(e) => handleSelectDay(e)} marginY={"10px"} placeholder='Dia'>
            <option value="0">Segunda</option>
            <option value="1">Terça</option>
            <option value="2">Quarta</option>
            <option value="3">Quinta</option>
            <option value="4">Sexta</option>
            <option value="5">Sábado</option>
            <option value="6">Domingo</option>
          </Select>
          <Select onChange={(e) => handleSelectTime(e)} marginY={"10px"} placeholder='Horário'>
            <option value="8">8:00</option>
            <option value="9">9:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
            <option value="19">19:00</option>
            <option value="20">20:00</option>
            <option value="21">21:00</option>
            <option value="22">22:00</option>
          </Select>
          <Select onChange={(e) => handleChangePriority(e)} marginY={"10px"} placeholder='Prioridade'>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>

          <ModalFooter>
            <Button colorScheme='red' variant='ghost' mr={3} onClick={onClose}>Fechar</Button>
            <Button colorScheme='blue' onClick={() => addActivity()}>Adicionar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}