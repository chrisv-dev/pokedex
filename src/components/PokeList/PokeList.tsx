import React from "react";
import styles from "./PokeList.module.scss";
import "./PokeList.scss";
import { Container, Row, Col, ListGroup, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  items: { url: string; name: string }[],
  next(): void,
  previous(): void,
  currentPage?: number,
};

class PokeList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="poke-list">
      <Container data-testid="poke-list">
        <Row>
          <Col>
            <ListGroup>
              {this.props.items.map((i, idx) => {
                return (
                  <Link data-testid="item" to={{
                    pathname: `/${i.name}/details`,
                  }}>
                    <div className={styles.listGroup}>
                  <ListGroup.Item action={true} key={idx}>
                      {i.name}
                      </ListGroup.Item>
                      </div>
                    </Link>
                );
              })}
                </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Pagination className={styles.pagination}>
              <Pagination.Prev onClick={this.props.previous} />
              <Pagination.Next data-testid="next" onClick={this.props.next} />
            </Pagination>
          </Col>
        </Row>
        </Container>
        </div>
    );
  }
}
export default PokeList;
