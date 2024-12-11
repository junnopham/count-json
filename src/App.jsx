import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

function App() {
  const [jsonTicket, setJsonTicket] = useState("");
  const [jsonWorkflow, setJsonWorkflow] = useState("");
  const [resultTicket, setResultTicket] = useState("");
  const [resultWorkflow, setResultWorkflow] = useState("");
  const [same, setSame] = useState(false);
  const [display, setDisplay] = useState(false);

  const count = () => {
    setDisplay(false);
    setSame(false);

    if (jsonTicket) {
      const temp = countKeyOccurrences(JSON.parse(jsonTicket));
      setResultTicket(JSON.stringify(sortKeys(temp), "", 4));
    }

    if (jsonWorkflow) {
      const temp = countKeyOccurrences(JSON.parse(jsonWorkflow));
      setResultWorkflow(JSON.stringify(sortKeys(temp), "", 4));
    }    
  }

  const check = () => {
    setDisplay(false);

    if (resultTicket && resultWorkflow) {
      const is = deepEqual(JSON.parse(resultTicket), JSON.parse(resultWorkflow));
      setSame(is);
      setDisplay(true);
    }
  }

  const countKeyOccurrences = (obj, skipNumericKeys = false) => {
    const keyCount = {};

    const search = (obj) => {
      for (let key in obj) {
        if (skipNumericKeys && !isNaN(Number(key))) {
          continue;
        }

        keyCount[key] = (keyCount[key] || 0) + 1;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (Array.isArray(obj[key])) {
            obj[key].forEach(element => search(element));
          } else {
            search(obj[key]);
          }
        }
      }
    }

    search(obj);
    return keyCount;
  }

  const sortKeys = (jsonObj) => {
    return Object.keys(jsonObj)
      .sort()
      .reduce((sortedObj, key) => {
        sortedObj[key] = jsonObj[key];
        return sortedObj;
      }, {});
  }

  function deepEqual(json1, json2) {
    if (typeof json1 === 'object' && json1 !== null && typeof json2 === 'object' && json2 !== null) {
      console.log("So sánh hai object:");
 
      const keys1 = Object.keys(json1);
      const keys2 = Object.keys(json2);
  
      console.log("Số lượng key của json1:", keys1.length);
      console.log("Số lượng key của json2:", keys2.length);
      
      if (keys1.length !== keys2.length) {
        console.log("Số lượng key khác nhau, trả về false.");
        return false;
      }

      for (let key of keys1) {
        console.log(`So sánh key: ${key}`);
  
        if (!keys2.includes(key)) {
          console.log(`Key "${key}" không có trong json2.`);
          return false;
        }
        console.log(`So sánh giá trị của key "${key}":`, json1[key], json2[key]);
  
        if (!deepEqual(json1[key], json2[key])) {
          console.log(`Giá trị của key "${key}" khác nhau, trả về false.`);
          return false;
        }
      }
  
      console.log("Các key và giá trị đều giống nhau.");
      return true;
    } else {
      console.log("So sánh giá trị cơ bản:", json1, json2);
      return json1 === json2;
    }
  }

  return (
    <>
      <Container className="p-3">
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.jsonTicket">
                <Form.Label>JSON 1</Form.Label>
                <Form.Control as="textarea" rows={15} value={jsonTicket} onChange={(e) => {setJsonTicket(e.target.value); setDisplay(false)}} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.jsonWorkflow">
                <Form.Label>JSON 2</Form.Label>
                <Form.Control as="textarea" rows={15} value={jsonWorkflow} onChange={(e) => {setJsonWorkflow(e.target.value); setDisplay(false)}} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="d-flex justify-content-md-center mb-3" controlId="exampleForm.count">
              <Button variant="primary" className="me-2" onClick={count}>Count</Button>
              <Button variant="primary" onClick={check}>Compare</Button>
            </Form.Group>
          </Row>
          {display && (<Row>
            <Form.Group className="d-flex justify-content-md-center" controlId="exampleForm.alert">
              <Alert variant={same ? 'success' : 'danger'}>
                { same ? 'Kết quả JSON giống nhau': 'Kết quả JSON không giống nhau'}
              </Alert>
            </Form.Group>
          </Row>)
          }
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.resultTicket">
                <Form.Label>Result 1</Form.Label>
                <Form.Control as="textarea" rows={15} value={resultTicket} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.resultWorkflow">
                <Form.Label>Result 2</Form.Label>
                <Form.Control as="textarea" rows={15} value={resultWorkflow} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default App
