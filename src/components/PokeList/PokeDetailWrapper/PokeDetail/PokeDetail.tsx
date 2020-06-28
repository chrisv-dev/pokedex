import React from "react";
import styles from "./PokeDetail.module.scss"; 
import "./PokeDetail.scss";
import { TPokeDetail, Evolution } from "../TPokeDetail";
import {
  ListGroup,
  Container,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import InfoCard from "../../../shared/InfoCard/InfoCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
          <div className={styles.children}>
          {
            items.map((i) => {
              return (
                <div className={styles.child}>
                  {this.renderEvolution(i.species.name, i.evolves_to, count + 1)}
                </div>
              );
            })
            }
          </div>        
      );
    };
    const renderName = (name:string) => (<Badge className={styles.badge} variant="primary">{name}</Badge>)
    if (items.length > 0) {
      return (
        <span className={styles.parent}>
          {renderName(name)}
          <FontAwesomeIcon className={styles.arrow} icon={faArrowRight} />
          {renderListGroup()}
        </span>
      )
    } else {
      return renderName(name);
    }
  }

  render() {
    const props = this.props;
    const evolution = this.props.evolutions.chain;
    return (
      <div className="poke-detail">
        <h2>
          {props.name}{" "}
          <span title="order number" className={styles.orderNumber}>#{this.props.order}</span>
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
              <InfoCard className={styles.evolutions} title={"Evolutions"}>
                {this.renderEvolution(
                  evolution.species.name,
                  evolution.evolves_to,
                  0
                )}
                </InfoCard>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default PokeDetail;
