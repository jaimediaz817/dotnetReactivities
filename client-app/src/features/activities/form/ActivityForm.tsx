import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Segment, Grid } from "semantic-ui-react";
import { ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
// REACT FINAL FORM
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/Util';
// V A L I D A T O R
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from "../../../app/stores/rootStore";



const validate = combineValidators({
    title: isRequired({ message: 'The event title is required'}),
    category: isRequired('Category'),
    dscription: composeValidators(
      isRequired('Dscription'),
      hasLengthGreaterThan(4)({message: 'La descripción necesita por lo menos 5 caracteres'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
})


interface DetailParams {
  id: string;
}


const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  // definiendo el store
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    loadActivity,
    createActivity,
    editActivity
  } = rootStore.activityStore;
  
  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  // HOOCK
  useEffect(() => {
    // TODO: refactorizado
    if (match.params.id) {      
    //if (match.params.id && activity.id.length === 0) {
      setLoading(true);
      loadActivity(match.params.id).then(activity =>{
        setActivity(new ActivityFormValues(activity));
      })
      .finally(()=> setLoading(false));
    }
  }, [
    loadActivity,
    match.params.id
  ]);






  // TODO: final form
  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity} = values;
    activity.date = dateAndTime;
    console.log(":::::::::::::::::::: carga de actividades submit :::::::::::::::::::::");
    console.log(activity);

    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity)
    } else {
      editActivity(activity)
    }    
  };





  // ********************************************
  // TODO: vista
  // ********************************************
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              // Refactorizando
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Título"
                  value={activity.title}
                  component={TextInput}
                />
                {/* Descripción */}
                <Field
                  name="dscription"
                  placeholder="Descripción"
                  rows={3}
                  value={activity.dscription}
                  component={TextAreaInput}
                />
                {/* Categoria */}
                <Field
                  name="category"
                  placeholder="Categoría"
                  value={activity.category}
                  options={category}
                  component={SelectInput}
                />

                <Form.Group widths='equal'>
                  {/* Fecha */}
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}                      
                    placeholder="Fecha"
                    value={activity.date}
                  />
                  {/* Hora */}
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Hora"
                    value={activity.time}
                  />                  
                </Form.Group>

                {/* Ciudad */}
                <Field
                  name="city"
                  placeholder="Ciudad"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  component={TextInput}
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                />
                { /*   S U B M I T    */}
                <Button
                  floated="right"
                  positive
                  type="submit"
                  content="Guardar"
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                />
                <Button
                  floated="right"
                  type="button"
                  content="Cancelar"
                  onClick={() => history.push("/activities")}
                />
                submittinh:: {submitting}
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
