import React from "react"
import { Card, Grid, Label, Placeholder } from "semantic-ui-react"

import "./StocksDashboard.css"

const StocksDashboard = (props) => {
  const { stocks } = props;

  const placeholderCards = []

  for (let i=0; i<10; i++) {
    placeholderCards.push(
      <Card key={i}>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='medium' />
              <Placeholder.Line length='short' />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>
    )
  }

  return (
    <div className="dashboard-container">
      <Card.Group>
        {Object.keys(stocks).length ? Object.keys(stocks).map(key => (
          <Card key={key}>
            <Card.Content>
              <Card.Header>
                {stocks[key].symbol}
                <Label className="stock-status" circular color={(stocks[key].trading ? "green" : "red")} empty />  
              </Card.Header>
              <Card.Description>
                <Grid divided='vertically'>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      Size: <span className="size-span">{stocks[key].size}</span>
                    </Grid.Column>
                    <Grid.Column>
                      Price: <span className="price-span">{stocks[key].price}</span>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Description>
            </Card.Content>
          </Card>
        )): placeholderCards}
      </Card.Group>
    </div>
  )
}

export default StocksDashboard