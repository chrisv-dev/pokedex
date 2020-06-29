import React from "react";
import styles from "./PokeList.module.css";
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
      <Container data-testid="poke-list">
        <Row>
          <Col>
            <ListGroup>
              {this.props.items.map((i, idx) => {
                return (
                  <Link data-testid="item" to={{
                    pathname: `/${i.name}/details`,
                  }}>
                  <ListGroup.Item action={true} variant="primary" key={idx}>
                    
                      {i.name}
                    
                    </ListGroup.Item>
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
    );
  }
}
export default PokeList;
