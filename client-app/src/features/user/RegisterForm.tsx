import React, {useContext} from 'react'
import { Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import { Form, Button, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';




// VALIDACIONES
const validate = combineValidators({
    username: isRequired('Username'),
    displayName: isRequired('Displayname'),
    email: isRequired('Email'),
    password: isRequired('Password')
});






const RegisterForm = () => {

    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;

    return (
        <FinalForm 
            onSubmit={(values: IUserFormValues) => 
                register(values).catch(error => ({
                    [FORM_ERROR]: error
                }))
            }
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
                    <Header as='h2' content='Register to Reactivities' color='teal' textAlign='center' />                    
                    <Field name="username" component={TextInput} placeholder='username'></Field>
                    <Field name="displayName" component={TextInput} placeholder='Display Name'></Field>
                    <Field name="email" component={TextInput} placeholder='Email'></Field>
                    <Field name="password" component={TextInput} placeholder='Password' type='password'></Field>

                    { submitError && !dirtySinceLastSubmit && (
                        // <Label 
                        //     color='red'
                        //     basic
                        //     content={submitError.statusText}
                        // />
                        <ErrorMessage 
                            error={submitError} 
                            //text={ JSON.stringify(submitError.data.errors)}                
                        />
                    )}
                    <Button 
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine} 
                        loading={submitting} 
                        color='teal'
                        content='Register'
                        fluid
                    />
                    <pre>{ ` variable invalid: ${ invalid } , la otra - dirtySinceSubmit:: ${dirtySinceLastSubmit}, pristine:: ${pristine}` }</pre>
                    <pre>{ /*JSON.stringify(form.getState(), null, 2) */ }</pre>
                </Form>
            )}
        />
    )
}

export default RegisterForm