import React from "react";
// import styles from './PokeDetail.module.css';
import { TPokeDetail, Evolution } from "../TPokeDetail";
import { Accordion, Card, ListGroup, Button } from "react-bootstrap";

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
            return(
                <ListGroup>
                {items.map((i) => {
                    return <ListGroup.Item>{this.renderEvolution(i.species.name, i.evolves_to, (count+1))}</ListGroup.Item>;
                })}
                </ListGroup>
            )
        }
        if (items.length > 0) {
            return (
                <Accordion defaultActiveKey={count === 0 ? undefined : count.toString()}>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} eventKey="0">
                                {name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {renderListGroup()}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            );
        } else {
            return name
        }
  }

  render() {
      const props = this.props;
      const evolution = this.props.evolutions.chain;
    return (
      <div>
        <h2>{props.name}</h2>
        order: {this.props.order}
        {Object.keys(this.props.sprites).map((imgKey) => {
          return <img src={this.props.sprites[imgKey]} alt="pokemon" />;
        })}
        <div>
          types:
          {this.props.types.map((t) => {
            return <div>{t.type.name}</div>;
          })}
        </div>
        <div>
          abilities:
          {this.props.abilities.map((ability) => {
            return <div>{ability.ability.name}</div>;
          })}
        </div>
        <div>
          Stats:
          {this.props.stats.map((stat) => {
            return (
              <div>{`${stat.stat.name} = ${stat.base_stat} (+ ${stat.effort})`}</div>
            );
          })}
        </div>
        <div>
          Moves:
          {this.props.moves.map((move) => {
            return <div>{`${move.move.name}`}</div>;
          })}
        </div>
        <div>
                Evolutions:
                   { this.renderEvolution(evolution.species.name, evolution.evolves_to, 0) }
          {/* {this.renderEvolutions(this.props.evolutions.chain)} */}
        </div>
      </div>
    );
  }
}
export default PokeDetail;
