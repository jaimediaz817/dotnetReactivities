import React, {useContext} from 'react'
import { Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { Form, Button, Label, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';


// VALIDACIONES
const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
});

const LoginForm = () => {

    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm 
            onSubmit={(values: IUserFormValues) => 
                login(values).catch(error => ({
                    [FORM_ERROR]: error
                })
            )}
            validate={ validate }
            render={({
                handleSubmit, 
                submitting, 
                submitError,
                invalid,
                pristine,
                dirtySinceLastSubmit
            }) => (
                <Form onSubmit={ handleSubmit} error>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
                    <Field name="email" component={TextInput} placeholder='Email'></Field>
                    <Field name="password" component={TextInput} placeholder='Password' type='password'></Field>
                    { submitError && !dirtySinceLastSubmit && 
                        // <Label 
                        //     color='red'
                        //     basic
                        //     content={submitError.statusText}
                        // />
                        <ErrorMessage error={submitError} text='Invalid Email or Password'/>
                    }
                    <Button 
                        disabled={invalid && !dirtySinceLastSubmit || pristine} 
                        loading={submitting} 
                        //positive 
                        color='teal'
                        content='login'
                        fluid
                    />
                    <pre>{ /*JSON.stringify(form.getState(), null, 2) */ }</pre>
                    <pre>{ ` la primer variable: ${ submitError } , la otra:: ${dirtySinceLastSubmit}` }</pre>
                </Form>
            )}
        />
    )
}

export default LoginForm
