"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AppHeader() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">testing-bbs</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">ホーム</Nav.Link>
          <Nav.Link href="/posts">一覧</Nav.Link>
          <Nav.Link href="/posts/new">記事作成</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
