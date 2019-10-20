import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Button, Form, Segment, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activitiesStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  // definiendo el store
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        dscription: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    dscription: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    match.params.id,
    clearActivity,
    initialFormState,
    activity.id.length
  ]);

  const handleOnChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    console.log("datos:", value);
    setActivity({
      ...activity,
      [name]: value
    });
  };

  // S U B M I T
  const handleSubmitActivity = () => {
    console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmitActivity}>
            <Form.Input
              name="title"
              onChange={handleOnChange}
              placeholder="Título"
              value={activity.title}
            />
            <Form.TextArea
              name="dscription"
              onChange={handleOnChange}
              rows={2}
              placeholder="Descripción"
              value={activity.dscription}
            />
            <Form.Input
              name="category"
              onChange={handleOnChange}
              placeholder="Categoría"
              value={activity.category}
            />
            <Form.Input
              name="date"
              onChange={handleOnChange}
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            />
            <Form.Input
              name="city"
              onChange={handleOnChange}
              placeholder="Ciudad"
              value={activity.city}
            />
            <Form.Input
              name="venue"
              onChange={handleOnChange}
              placeholder="Venue"
              value={activity.venue}
            />
            <Button
              floated="right"
              positive
              type="submit"
              content="Guardar"
              loading={submitting}
            />
            <Button
              floated="right"
              type="button"
              content="Cancelar"
              onClick={() => history.push("/activities")}
            />
            submittinh:: {submitting}
          </Form>
        </Segment>
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
