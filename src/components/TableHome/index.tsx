import React, { useState, useEffect } from "react";

import axios from "axios";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
    marginBottom: 20,
  },
  rightButton: {
    float: "right",
    margin: 20,
  },
  wrap: {
    margin: 20,
  },
  oneBlock: {
    marginTop: 20,
  },
  table: {
    minWidth: 650,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  floatingLeftTop: {
    position: "fixed",
    left: 30,
    top: 30,
  },
  floatingLeftButtom: {
    position: "fixed",
    left: 30,
    bottom: 30,
  },
  floatingRightButtom: {
    position: "fixed",
    right: 30,
    bottom: 30,
  },
  pos: {
    marginBottom: 12,
  },
});

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const linkDefault =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
function TableHome() {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [data, setData] = useState<UserType[]>([]);
  const [dataLink, setDataLink] = useState(linkDefault);
  const [isHiden, setIsHiden] = useState<boolean>(true);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchConrtoller, setSearchConrtoller] = useState<string>("");
  const [formController, setformController] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [OneUser, setOneUser] = useState<UserType | null>(null);
  useEffect(() => {
    axios.get(dataLink).then(({ data }) => {
      const users = data;
      console.log(data);
      setData(users);
    });
  }, [dataLink]);

  //Можно было вынести сортировку и не дублировать код...
  //Знаю, что плохо; (Можно было взять сразу таблицу с сортировкой по столбцам (Material-UI))
  function sortBy(col: number) {
    switch (col) {
      case 0: //ID
        if (data[0].id < data[data.length - 1].id) {
          setData([...data].sort((a, b) => (a.id < b.id ? 1 : -1)));
        } else {
          setData([...data].sort((a, b) => (a.id > b.id ? 1 : -1)));
        }
        break;
      case 1: //FirstName
        if (data[0].firstName < data[data.length - 1].firstName) {
          setData(
            [...data].sort((a, b) => (a.firstName < b.firstName ? 1 : -1))
          );
        } else {
          setData(
            [...data].sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
          );
        }
        break;
      case 2: //LastName
        if (data[0].lastName < data[data.length - 1].lastName) {
          setData([...data].sort((a, b) => (a.lastName < b.lastName ? 1 : -1)));
        } else {
          setData([...data].sort((a, b) => (a.lastName > b.lastName ? 1 : -1)));
        }
        break;
      case 3: //Email
        if (data[0].email < data[data.length - 1].email) {
          setData([...data].sort((a, b) => (a.email < b.email ? 1 : -1)));
        } else {
          setData([...data].sort((a, b) => (a.email > b.email ? 1 : -1)));
        }
        break;
      case 4: //Phone
        if (data[0].phone < data[data.length - 1].phone) {
          setData([...data].sort((a, b) => (a.phone < b.phone ? 1 : -1)));
        } else {
          setData([...data].sort((a, b) => (a.phone > b.phone ? 1 : -1)));
        }
        break;
      default:
        setData([...data]);
        break;
    }
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Button
            className={classes.rightButton}
            variant="contained"
            onClick={() => {
              setData([]);
              setDataLink(
                "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
              );
            }}
          >
            1000 Rows
          </Button>
          <Button
            className={classes.rightButton}
            variant="contained"
            onClick={() => {
              setData([]);
              setDataLink(
                "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
              );
            }}
          >
            32 Rows
          </Button>
        </CardContent>
      </Card>
      <Fab
        color="primary"
        variant="extended"
        className={classes.floatingLeftButtom}
        onClick={() => {
          if (0 < pageNumber) {
            setPageNumber(pageNumber - 1);
          } else {
            alert("Крайняя страница");
          }
        }}
      >
        <Typography>Previous page</Typography>
      </Fab>
      <Fab
        variant="extended"
        className={classes.floatingLeftTop}
        onClick={() => {
          setPageNumber(0);
        }}
      >
        <Typography>This is {pageNumber + 1} page</Typography>
      </Fab>
      <Fab
        color="primary"
        variant="extended"
        className={classes.floatingRightButtom}
        onClick={() => {
          if (
            pageNumber <
            data.filter((user) => user.firstName.includes(searchConrtoller))
              .length /
              20 -
              1
          ) {
            setPageNumber(pageNumber + 1);
          } else {
            alert("Крайняя страница");
          }
        }}
      >
        <Typography>Next page</Typography>
      </Fab>
      <Container maxWidth="md" className={classes.root}>
        <Button
          onClick={() => {
            setIsHiden(!isHiden);
          }}
        >
          {isHiden ? "Show Form" : "Close Form"}
        </Button>
        {!isHiden ? (
          // Про валидацию формы ничего не сказано (Сделал только для ID)
          <form>
            <TextField
              className={classes.wrap}
              id="outlined-multiline-flexible"
              label="ID"
              value={formController.id}
              onChange={(e) => {
                setformController(
                  Object.assign({}, formController, {
                    id: e.target.value.replace(/\D+/g, ""),
                  })
                );
              }}
              rowsMax={4}
            />
            <TextField
              className={classes.wrap}
              id="outlined-multiline-flexible"
              label="First Name"
              value={formController.firstName}
              onChange={(e) => {
                setformController(
                  Object.assign({}, formController, {
                    firstName: e.target.value,
                  })
                );
              }}
              rowsMax={4}
            />
            <TextField
              className={classes.wrap}
              id="outlined-multiline-flexible"
              label="Last Name"
              value={formController.lastName}
              onChange={(e) => {
                setformController(
                  Object.assign({}, formController, {
                    lastName: e.target.value,
                  })
                );
              }}
              rowsMax={4}
            />
            <TextField
              className={classes.wrap}
              id="outlined-multiline-flexible"
              label="Phone"
              value={formController.phone}
              onChange={(e) => {
                setformController(
                  Object.assign({}, formController, { phone: e.target.value })
                );
              }}
              rowsMax={4}
            />
            <TextField
              className={classes.root}
              id="outlined-multiline-flexible"
              label="Email"
              value={formController.email}
              onChange={(e) => {
                setformController(
                  Object.assign({}, formController, { email: e.target.value })
                );
              }}
              rowsMax={4}
            />
            <Button
              className={classes.wrap}
              variant="contained"
              color="primary"
              onClick={() => {
                setData([
                  {
                    id: parseInt(formController.id),
                    firstName: formController.firstName,
                    lastName: formController.lastName,
                    email: formController.email,
                    phone: formController.phone,
                  },
                  ...data,
                ]);
              }}
            >
              Add
            </Button>
          </form>
        ) : null}
        <Card className={classes.root}>
          <CardContent>
            Click on user for user's information under the table
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <TextField
              className={classes.root}
              id="outlined-multiline-flexible"
              label="Search by First name"
              value={searchInputValue}
              onChange={(e) => {
                setSearchInputValue(e.target.value);
              }}
              rowsMax={4}
            />
            <Button
              className={classes.rightButton}
              variant="contained"
              onClick={() => {
                setSearchConrtoller(searchInputValue);
              }}
            >
              Search
            </Button>
          </CardContent>
        </Card>
        <TableContainer component={Paper} className={classes.oneBlock}>
          {data.length === 0 ? (
            <Card>
              <CardContent>
                <Typography>Loading...</Typography>
              </CardContent>
            </Card>
          ) : (
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    onClick={() => {
                      sortBy(0);
                    }}
                    align="right"
                  >
                    id
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      sortBy(1);
                    }}
                    align="right"
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      sortBy(2);
                    }}
                    align="right"
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      sortBy(3);
                    }}
                    align="right"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      sortBy(4);
                    }}
                    align="right"
                  >
                    Phone
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .filter((user) => user.firstName.includes(searchConrtoller))
                  .slice(pageNumber * 20, 20 + pageNumber * 20)
                  .map((row) => (
                    <TableRow
                      hover
                      onClick={() => {
                        setOneUser(row);
                      }}
                    >
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.firstName}</TableCell>
                      <TableCell align="right">{row.lastName}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {OneUser ? (
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {OneUser?.id}
              </Typography>
              <Typography variant="h5" component="h2">
                {OneUser?.firstName}
              </Typography>
              <Typography variant="h5" component="h2">
                {OneUser?.lastName}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {OneUser?.phone}
              </Typography>
              <Typography variant="body2" component="p">
                {OneUser?.email}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </Container>
    </>
  );
}

export default TableHome;
