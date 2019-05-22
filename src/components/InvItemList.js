import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

const itemListStyles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 400,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const dialogStyles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

class SimpleDialog extends React.Component {

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} >
        <div>
          <img className="image" src={selectedValue} onClick={this.handleClose} alt="" />
        </div>
      </Dialog>
    );
  }

}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(dialogStyles)(SimpleDialog);

class InvItemList extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    open: false,
    rowKey: ''
  };

  componentDidMount() {
    let pageNum = (this.props.location.state) ? this.props.location.state.pageNum : 0;
    this.setState({
      page: pageNum,
    });

    axios.get('/items')
      .then(response => {
        this.setState({ rows: response.data, page: parseInt(pageNum) });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value) });
  };

  handleCellClick = (rowKey, pageNum) => {
    return (event) => {
      var path = {
        pathname: '/invItemDetail',
        state: {
          itemId: rowKey,
          pageNum: pageNum
        }
      }
      this.props.history.push(path);
    }
  }

  handleDialogClickOpen = (rowKey) => {
    this.setState({
      open: true,
      rowKey: rowKey
    });
  };

  handleDialogClickClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} >
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Avatar alt="item image" src={row.image} className={classes.avatar} onClick={this.handleDialogClickOpen.bind(this, row.id)} />
                    <SimpleDialogWrapped
                      selectedValue={row.image}
                      open={(this.state.rowKey === row.id) && (this.state.open === true)}
                      onClose={this.handleDialogClickClose.bind(this)}
                    />
                  </TableCell>
                  <TableCell align="right" onClick={this.handleCellClick(row.id, page)} >{row.name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

InvItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(itemListStyles)(InvItemList);
