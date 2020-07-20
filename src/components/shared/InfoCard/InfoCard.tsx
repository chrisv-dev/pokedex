import React from "react";
import "./InfoCard.scss";
import { Accordion, Card } from "react-bootstrap";

type Props = {
  title: string;
  className?: string;
  eventKey: string;
};
type State = {};

class InfoCard extends React.Component<Props, State> {
  private myRef: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
  }

  render() {
    return (
      <div ref={this.myRef} className={`info-card ${this.props.className}`}>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            variant="link"
            onClick={(e) => {
              if (this.myRef && this.myRef.current) {
                // TODO: implement scroll
                // this.myRef.current.offsetTop
              }
            }}            
            eventKey={this.props.eventKey}
          >
            {this.props.title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={this.props.eventKey}>
            <Card.Body>{this.props.children}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    );
  }
}
export default InfoCard;
