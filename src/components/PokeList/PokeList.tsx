import React from "react";
import styles from "./PokeList.module.css";
import { Container, Row, Col, ListGroup, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  items: { url: string; name: string }[],
  next(): void,
  previous(): void,
//     onPageChange(pageUrl?: string): void,
  currentPage: number,
};

class PokeList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {this.props.items.map((i, idx) => {
                return (
                  <ListGroup.Item action={true} variant="primary" key={idx}>
                    <Link to={{
                      pathname: `/${i.name}/details`,
                    }}>
                      {i.name}
                    </Link>
                  </ListGroup.Item>
                );
                // return <Col className={styles.col}>{i.name}</Col>
              })}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Pagination className={styles.pagination}>
              {/* <Pagination.First /> */}
              <Pagination.Prev onClick={this.props.previous} />
              {/* <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />
                    
                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>
                    
                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item> */}
              <Pagination.Next onClick={this.props.next} />
              {/* <Pagination.Last /> */}
            </Pagination>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default PokeList;
