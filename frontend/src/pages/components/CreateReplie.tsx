import { ChangeEvent, FormEvent, useState } from "react";
import Form from 'react-bootstrap/Form';
import useTweeah from "../../hooks/useTweeah";
import { useNavigate } from "react-router-dom";

type PropsType = {
    id: number
}

const CreateReplie = ({id}:PropsType) => {
    const navigate = useNavigate();
    const {createReplie} = useTweeah();
    const [body, setBody] = useState<string>('')
    const {mutate, error} = createReplie();
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setBody(e.target.value)
    }
    
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const datapost = {
            body: body,
        }

        mutate({id,datapost});
        setBody('');
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Body</Form.Label>
                    <Form.Control type="text" placeholder="body" value={body} onChange={handleChange}/>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateReplie;