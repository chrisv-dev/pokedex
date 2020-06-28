import React from "react";
import "./InfoCard.scss";
import { Accordion, Card } from "react-bootstrap";

type Props = {
    title: string;
    className?: string;
};
type State = {};

class InfoCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
      return (
          <Accordion className={`info-card ${this.props.className}`}>
        <Card>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
            {this.props.title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{this.props.children}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}
export default InfoCard;
