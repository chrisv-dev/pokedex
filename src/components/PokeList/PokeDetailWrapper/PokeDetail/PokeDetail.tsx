import React from "react";
import styles from "./PokeDetail.module.css";
import "./PokeDetail.scss";
import { TPokeDetail, Evolution } from "../TPokeDetail";
import {
  Accordion,
  Card,
  ListGroup,
  Button,
  Container,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import InfoCard from "../../../shared/InfoCard/InfoCard";

type Props = TPokeDetail;

class PokeDetail extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pokemon: {},
      loaded: false,
    };
  }

  async componentDidMount() {}

  renderEvolution(name: string, items: Evolution[], count: number) {
    const renderListGroup = () => {
      return (
        <ListGroup>
          {items.map((i) => {
            return (
              <ListGroup.Item>
                {this.renderEvolution(i.species.name, i.evolves_to, count + 1)}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    };
    if (items.length > 0) {
      return (
        <Accordion
          defaultActiveKey={count === 0 ? undefined : count.toString()}
        >
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} eventKey="0">
                {name}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{renderListGroup()}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );
    } else {
      return name;
    }
  }

  render() {
    const props = this.props;
    const evolution = this.props.evolutions.chain;
    return (
      <div className="poke-detail">
        <h2>
          {props.name}{" "}
          <span className={styles.orderNumber}>#{this.props.order}</span>
        </h2>
        {this.props.types.map((t) => (
          <Badge className={styles.badge} variant="primary">
            {t.type.name}
          </Badge>
        ))}
        <Container>
          <Row>
            <Col>
              {Object.keys(this.props.sprites).map((imgKey) => {
                return <img src={this.props.sprites[imgKey]} alt="pokemon" />;
              })}

              <InfoCard title={"Abilities"}>
                <ListGroup>
                  {this.props.abilities.map((ability) => (
                    <ListGroup.Item>{ability.ability.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </InfoCard>

              <InfoCard className="stats" title={"Stats"}>
                <ListGroup>
                  {this.props.stats.map((stat) => (
                    <ListGroup.Item>
                      {`${stat.stat.name}: ${stat.base_stat}`}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </InfoCard>
              <InfoCard title={"Moves"}>
                <ListGroup>
                  {this.props.moves.map((move) => (
                    <ListGroup.Item>{`${move.move.name}`}</ListGroup.Item>
                  ))}
                </ListGroup>
              </InfoCard>
              <div>
                Evolutions:
                {this.renderEvolution(
                  evolution.species.name,
                  evolution.evolves_to,
                  0
                )}
                {/* {this.renderEvolutions(this.props.evolutions.chain)} */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default PokeDetail;
