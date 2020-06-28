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
  Pagination,
} from "react-bootstrap";
import InfoCard from "../../../shared/InfoCard/InfoCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import DropDown from '../../../shared/DropDown/DropDown';

type Props = TPokeDetail;
type State = {
  selectedVersion: null | string,
  versions: string[],
  showingMoves: TPokeDetail['moves'],
  moveMethods: string[],
  move: {itemsPerPage: number, currentPage: number},
}

class PokeDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedVersion: null,
      versions: [],
      showingMoves: [],
      moveMethods: [],
      move: {
        itemsPerPage: 5,
        currentPage: 0,
      },
      
    };
  }

  componentDidMount() {
    const versions = this.getVersions();
    const moveMethods = this.getMoveMethods();
    const selectedVersion = 0;
    const showingMoves = this.getMovesForVersion(this.props.moves, versions[selectedVersion]);
    this.setState({ versions: this.getVersions(), selectedVersion:versions[selectedVersion], showingMoves, moveMethods });
  }

  renderEvolution(name: string, items: Evolution[], count: number) {
    const renderListGroup = () => {
      return (
          <div className={styles.children}>
          {
            items.map((i, index) => {
              return (
                <div key={index} className={styles.child}>
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

  getVersions() {
    const moves = this.props.moves;
    let rv = [];
    for (let a = 0; a < moves.length; a++){
      const move = moves[a];
      for (let b = 0; b < move.version_group_details.length; b++){
        const details = move.version_group_details[b];
        rv.push(details.version_group.name);
      }
    }
    return _.uniq(rv);
  }

  getMoveMethods() {
    const moves = this.props.moves;
    let rv = [];
    for (let a = 0; a < moves.length; a++){
      const move = moves[a];
      for (let b = 0; b < move.version_group_details.length; b++){
        const details = move.version_group_details[b];
        rv.push(details.move_learn_method.name);
      }
    }
    return _.uniq(rv);
  }

  setVersion(version: string) {
    const showingMoves = this.getMovesForVersion(this.props.moves, version);
    this.setState({ selectedVersion: version, showingMoves });
  }

  getMovesForVersion(moves: TPokeDetail['moves'], version: string) {  // .
    let versionMoves = [];
    for (let a = 0; a < moves.length; a++){
      const move = moves[a];
      for (let b = 0; b < move.version_group_details.length; b++){
        const details = move.version_group_details[b];
        if (details.version_group.name === version) {
          versionMoves.push(move);
          break;
        }
      }
    }
    return versionMoves;
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
        {this.props.types.map((t, index) => (
          <Badge key={index} className={styles.badge} variant="primary">
            {t.type.name}
          </Badge>
        ))}
        <Container>
          <Row>
            <Col>
              {Object.keys(this.props.sprites).map((imgKey, index) => {
                return <img key={index} src={this.props.sprites[imgKey]} alt="pokemon" />;
              })}

              <InfoCard title={"Abilities"}>
                <ListGroup>
                  {this.props.abilities.map((ability, index) => (
                    <ListGroup.Item key={index}>{ability.ability.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </InfoCard>

              <InfoCard className="stats" title={"Stats"}>
                <ListGroup>
                  {this.props.stats.map((stat, index) => (
                    <ListGroup.Item key={index}>
                      {`${stat.stat.name}: ${stat.base_stat}`}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </InfoCard>
              <InfoCard className={styles.moves} title={"Moves"}>
                <div className={styles.version}>
                  Version: <DropDown title="Version" options={this.state.versions} onChange={(option) => { this.setVersion(option) }} />
                </div>
              {/* {
                  this.state.versions.map((v, index) =>
                    <Badge
                      style={{cursor:'pointer'}}
                      className={styles.badge}
                      variant={index === this.state.selectedVersion ? 'primary' : 'secondary'}
                      onClick={() => { this.setVersion(index, this.state.versions) }}>
                      {v}
                    </Badge>
                  )
                } */}
                <div
                  // style={{ display: 'flex', flexDirection: 'row' }}
                >
                <ListGroup>
                    {this.state.showingMoves
                      .slice(this.state.move.currentPage * this.state.move.itemsPerPage,
                        this.state.move.currentPage * this.state.move.itemsPerPage + this.state.move.itemsPerPage)
                      .map((move, index) => (
                    <ListGroup.Item key={index}>{`${move.move.name}`}</ListGroup.Item>
                  ))}
                  </ListGroup>
                  <Pagination className={styles.pagination}>
                    <Pagination.Prev
                      disabled={this.state.move.currentPage === 0}
                      onClick={() => { this.setState((s) => { s.move.currentPage -= 1; return s; }) }}
                    />
                    <Pagination.Next
                      disabled={this.state.move.currentPage * this.state.move.itemsPerPage >= this.state.showingMoves.length}
                      onClick={() => { this.setState((s) => { s.move.currentPage += 1; return s; }) }}
                    />
                  </Pagination>
                </div>
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