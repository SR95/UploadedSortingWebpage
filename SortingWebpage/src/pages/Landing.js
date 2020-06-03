import React, { Component } from "react";

import {
  Button,
  Card,
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import landingPageStyle from "./styles/landingpagestyle";

import bubblesort from "../sorting-algos/bubblesort";
import insertionsort from "../sorting-algos/insertionsort";

class LandingPage extends Component {
  state = {
    arrayToSort: [],
    labelName: "Type Number(s)",
    labelValue: "",
    num: null,

    sortingAlgorithm: "Bubble Sort",
    sortingIP: false,
    sortingIndex: 0,
    autoSort: false,
    fullySorted: true
  };

  setNumber = num => {
    this.setState({
      labelValue: num,
      num: num
    });
  };

  // ~~~~~~~~~~~ ADD A NUMBER TO ARRAY ~~~~~~~~~~~~~~
  addNumber = () => {
    var newArray = this.state.arrayToSort;
    if (
      !isNaN(this.state.num) &&
      this.state.num !== null &&
      this.state.num.replace(/^\s+/, "").replace(/\s+$/, "") !== ""
    ) {
      this.setState({ numericError: false });
      newArray = newArray.concat(parseInt(this.state.num, 10));
    } else {
      this.setState({ numericError: true });
    }

    this.setState(() => {
      return {
        arrayToSort: newArray,
        labelName: "Type Number(s)",
        labelValue: "",
        num: null
      };
    });
  };

  // ~~~~~~~~~~~~~~~ SORTING ~~~~~~~~~~~~~~~~
  sortArray = autoSort => {
    if (this.state.sortingAlgorithm == "Bubble Sort") {
      this.setState({ sortingIP: true });
      let { newArray, done } = bubblesort(
        this.state.arrayToSort,
        this.state.sortingIndex,
        this.state.autoSort || autoSort
      );

      // no autosort
      this.setState({
        sortingIndex: this.state.sortingIndex + 1,
        fullySorted: done && this.state.fullySorted
      });

      // endpoint regardless of autoSort or not
      if ((this.state.autoSort || autoSort) && done)
        this.setState({ sortingIP: false, sortingIndex: 0 });
      else if (
        !(this.state.autoSort || autoSort) &&
        done &&
        this.state.fullySorted &&
        this.state.sortingIndex == this.state.arrayToSort.length - 1
      )
        this.setState({ sortingIP: false, sortingIndex: 0 });
      // update the array
      this.setState({ arrayToSort: newArray });

      // update sorting index
      if (this.state.sortingIndex == this.state.arrayToSort.length - 1)
        this.setState({ sortingIndex: 0, fullySorted: true });
    } else if (this.state.sortingAlgorithm == "Insertion Sort") {
      let newArray = insertionsort(this.state.arrayToSort, true);
      this.setState({
        arrayToSort: newArray
      });
    }
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.addNumber();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <div className={classes.titleContainer}>Sort-your-number.exe</div>
        <div className={classes.headerContainer} style={{ marginTop: 50 }}>
          <TextField
            label={this.state.labelName}
            value={this.state.labelValue}
            onChange={e => this.setNumber(e.target.value)}
            variant="outlined"
            style={{ flexGrow: 4, marginRight: 20 }}
            onKeyPress={this.handleKeyPress}
            error={this.state.numericError}
            required
            helperText={
              (this.state.numericError && "Value must be a number.") || ""
            }
          />
          <Button style={{ flexGrow: 1 }} onClick={this.addNumber}>
            Submit
          </Button>
          <Button
            style={{ flexGrow: 1 }}
            disabled={this.state.sortingIP}
            onClick={() => this.sortArray(false)}
          >
            Begin Sort
          </Button>
          <Button
            style={{ flexGrow: 1 }}
            disabled={this.state.arrayToSort.length === 0}
            onClick={() =>
              this.setState({
                arrayToSort: [],
                labelName: "Type Number(s)",
                labelValue: "",
                num: null,
                sortingAlgorithm: "Bubble Sort",
                sortingIP: false,
                sortingIndex: 0,
                autoSort: false,
                fullySorted: true
              })
            }
          >
            Reset
          </Button>
        </div>
        <div className={classes.headerContainer}>
          <FormControl
            className={classes.formControl}
            disabled={this.state.sortingIP}
          >
            <InputLabel id="select-sorting-algorithm">
              Choose a sorting Algorithm
            </InputLabel>
            <Select
              labelId="select-sorting-algorithm-label"
              id="select-sorting-algorithm-id"
              value={this.state.sortingAlgorithm}
              onChange={event => {
                this.setState({ sortingAlgorithm: event.target.value });
              }}
            >
              <MenuItem value="Bubble Sort">Bubble Sort</MenuItem>
              <MenuItem value="Insertion Sort">Insertion Sort</MenuItem>
              <MenuItem disabled value="Merge Sort">
                Merge Sort
              </MenuItem>
            </Select>
            <FormHelperText>Default is Bubble Sort.</FormHelperText>
          </FormControl>
          <Button
            className={classes.algoTraversalButtons}
            style={{ marginLeft: 30 }}
            disabled={this.state.autoSort || !this.state.sortingIP}
            onClick={() => this.sortArray(false)}
          >
            Next step
          </Button>
          <ToggleButton
            className={classes.algoTraversalButtons}
            value="auto sort"
            selected={this.state.autoSort}
            onChange={() => {
              console.log(this.state.autoSort);
              this.setState({
                autoSort: !this.state.autoSort,
                sortingIndex: 0
              });

              if (this.state.sortingIP) this.sortArray(true);
            }}
          >
            Auto sort
          </ToggleButton>
        </div>
        <div className={classes.listContainer}>
          {this.state.arrayToSort.map((arrayNumber, index) => (
            <Card
              className={classes.cardContainer}
              style={{
                backgroundColor:
                  (index == this.state.sortingIndex ||
                    index == this.state.sortingIndex - 1) &&
                  this.state.sortingIP
                    ? "red"
                    : "#D3D3D3"
              }}
            >
              <Typography variant="h1">{arrayNumber}</Typography>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
