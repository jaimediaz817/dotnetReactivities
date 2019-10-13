import React, { useState, FormEvent } from "react";
import { Button, Checkbox, Form, Segment } from "semantic-ui-react";
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;

    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;

    submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({
        setEditMode,
        activity: initialFormState,

        createActivity,
        editActivity,

        submitting
    }) => {

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState
        }else{
            return {
                id: '',
                title: '',
                category: '',
                dscription: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleOnChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        console.log("datos:", value)
        setActivity({
            ...activity,
            [name]: value
        });
    }

    // S U B M I T 
    const handleSubmitActivity = () => {
        console.log(activity);
        if (activity.id.length === 0) 
        {
            let newActivity = {
                ...activity, 
                id: uuid()
            };
            createActivity(newActivity);
        } 
        else 
        {
            editActivity(activity);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={ handleSubmitActivity } >
                <Form.Input 
                    name='title' 
                    onChange={ handleOnChange } 
                    placeholder="Título" 
                    value={ activity.title } 
                />
                <Form.TextArea 
                    name='dscription' 
                    onChange={ handleOnChange } 
                    rows={2} 
                    placeholder="Descripción" 
                    value={ activity.dscription } 
                />
                <Form.Input 
                    name='category' 
                    onChange={ handleOnChange } 
                    placeholder="Categoría" 
                    value={ activity.category } 
                />
                <Form.Input 
                    name='date' 
                    onChange={ handleOnChange } 
                    type="datetime-local" 
                    placeholder="Date" 
                    value={ activity.date }
                />
                <Form.Input 
                    name='city' 
                    onChange={ handleOnChange } 
                    placeholder="Ciudad" 
                    value={ activity.city } 
                />
                <Form.Input 
                    name='venue' 
                    onChange={ handleOnChange } 
                    placeholder="Venue" 
                    value={ activity.venue } 
                />

                <Button 
                    floated='right' 
                    positive type='submit' 
                    content='Guardar'
                    loading = { submitting }
                />
                <Button 
                    floated='right' 
                    type='button' 
                    content='Cancelar' 
                    onClick={
                        ()=> setEditMode(false)
                    }
                />
            </Form>
        </Segment>
    );
};

export default ActivityForm;
