import React from "react";
import { useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { PostDetailProps } from '@/types'

const PostDetail: React.FC<PostDetailProps> = ({
  post,
  onDelete,
  onEdit,
}) => {
  const {
    id,
    title,
    content,
    author,
    createdAt,
  } = post;
  return (
    <Container fluid>
      <Row>
        <Col xs={1}>
          <h1>{title}</h1>
        </Col>
        <Col xs={4}>
          <Button variant="danger" onClick={onDelete}>
            削除
          </Button>
          <Button
            variant="warning"
            onClick={onEdit}
          >
            更新
          </Button>
        </Col>
      </Row>
      <Row>{content}</Row>
      <Row>投稿者: {author}</Row>
      <Row>投稿日: {createdAt}</Row>
    </Container>
  );
};

export default PostDetail;
