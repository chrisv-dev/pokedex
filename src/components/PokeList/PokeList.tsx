import React from "react";
import styles from "./PokeList.module.css";
import { Container, Row, Col, ListGroup, Pagination } from "react-bootstrap";

type Props = {
  items: { url: string; name: string }[];
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
                    {i.name}
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
              <Pagination.Prev />
              {/* <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />
                    
                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>
                    
                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item> */}
              <Pagination.Next />
              {/* <Pagination.Last /> */}
            </Pagination>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default PokeList;
