import React , {useState, useEffect} from 'react'
import { Box,Button, Avatar,Heading, Text, Link ,FormControl,FormLabel, Input,RadioGroup,Radio,Stack, Flex} from '@chakra-ui/react'
import axios from "axios"
import { Divider } from '@chakra-ui/react'
import { useNavigate, useParams} from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

  const ViewAllStudents = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender ,setGender] = useState("");
    const [phoneno , setPhoneNo] = useState("");
    const [password, setPassword]= useState("");
    const [profileimg , setProfileImg]= useState("");
    const [students , setStudents]= useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const navigate = useNavigate();
    const handleSubmit = (studentid) =>
    
    {

         localStorage.removeItem('studentid')
         localStorage.setItem('studentid',studentid)
            navigate("/admin/editstudent");
    }

    const handleSubmitAssign = (student_assignid) =>
    
    {
         localStorage.removeItem('student_assignid')
         localStorage.setItem('student_assignid',student_assignid)
            navigate("/admin/assignstudent");
    }
    useEffect(() => {
      axios
        .get("http://localhost:5000/student/getstudents")
        .then((res) => {
          console.log(res.data);
          setStudents(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const DeleteStudent=(student_id)=>
    {
    
      localStorage.setItem('student_id',student_id)
      axios.delete(`http://localhost:5000/student/deletestudent/${localStorage.getItem('student_id')}`)
      .then((res) => {
        //window.alert("Delete Successfull!")
    }).catch((error) => {
      //window.alert("Not Deleted! ")
    })
    }
  
    const paperStyle = {padding : 20, height: '400vh', width: 900,
      margin: '80px 0px 50px 240px'}
    const btStyle = { margin: "30px 0px 12px" };
    const textStyle = { margin: "3px 0" };
    return (

      <Box pt={0} px={0} mx='auto' textAlign={'center'} width={'100%'} backgroundColor='gray.100' borderRadius={30}>
      <Box pt={4} pb={2}  >
        <Heading mb={4} >
          View Students
        </Heading>
        <Text mb={6}>
          This page account details od all students and allows you to edit them.
        </Text>
      </Box>

      <Box maxW='4xl' mx="auto" >
        <Flex p={4} pt={0}>
          <Input placeholder="Student's Name" variant={'outlined'} borderColor='orange'></Input>
          <Button colorScheme={'orange'}>Search</Button>
        </Flex>

        <Flex border={'1px solid orange'} gap={2} justifyContent='space-around' height='50vh' borderRadius='20px' p={4} flexWrap='wrap' overflow='scroll'>

          {students.map((student) => (
            <Flex border={'1px solid orange'} width={'250px'} borderRadius={30} p={2} alignItems='center' justifyContent={'space-around'}>

              <Avatar
                src={student.profileimg}
                size="lg"
                ml={0}/>

              <Box ml={0} >
                <Text>
                  {student.name}
                </Text> 
                <Text>
                  {student.email}
                </Text> 
                <Text>
                  {student.gender}
                </Text> 
                <Text>
                  {student.password}
                </Text>
              </Box>

              <Flex flexDir={'column'} justifyContent='center'>
                <Button  onClick={()=>handleSubmit(student._id)} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-pen-to-square"></i>
                </Button>

                <Button  onClick={onOpen} colorScheme='orange' variant='ghost'>
                  <i class="fa-solid fa-trash"></i>
                </Button>

                <Button onClick={()=>handleSubmitAssign(student._id)} colorScheme='orange' variant='ghost'>
                  <i class="fa-sharp fa-solid fa-person-circle-plus"></i>
                </Button>
              </Flex>
              
            </Flex>
          ))}


            {/* Lookk thisss uPPP //Jaaan */}
            
          <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete 
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme='red' onClick={()=>DeleteStudent(student._id)} ml={3}>
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
        </AlertDialog>

        </Flex>
      </Box>

    </Box>

    );
  };
  
  export default ViewAllStudents;
  