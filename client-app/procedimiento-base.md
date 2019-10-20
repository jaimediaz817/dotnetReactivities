Instalando GUI

npm install --save uuid
TS:
`npm install @types/uuid`

{/_ https://react.semantic-ui.com/images/avatar/large/matthew.png _/}

BACKUP ActivityDetails:

    <Card style={{ width: "100%" }}>
      <Image src= {`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <div className="">más detalles</div>
        <Card.Header>{ activity!.city }</Card.Header>
        <Card.Meta>
          <span className="date">{ activity!.title}</span>
        </Card.Meta>
        <Card.Description>{ activity!.dscription }</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
              basic
              color="blue"
              content="Editar"
              as={ Link } to={`/manage/${activity.id}`}
            />
          <Button
              basic
              color="grey"
              content="Cancelar"
              onClick={
                ()=> {
                  history.push('/activities')
                }
              } >
            </Button>
        </Button.Group>
      </Card.Content>
    </Card>
