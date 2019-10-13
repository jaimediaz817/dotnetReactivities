import React, { useState, FormEvent, useContext } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activitiesStore';
import { observer } from "mobx-react-lite";

interface IProps {
    activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
        activity: initialFormState
    }) => {

    // definiendo el store
    const activityStore = useContext(ActivityStore);        
    const { createActivity, editActivity, submitting, cancelFormOpen } = activityStore;

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
                        cancelFormOpen
                    }
                />
                submittinh:: { submitting}
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);
