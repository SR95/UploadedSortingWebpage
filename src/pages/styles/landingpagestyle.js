const landingPageStyle = theme => ({
  algoTraversalButtons: { marginLeft: 10, alignSelf: "center", height: "50px" },
  landingContainer: {
    margin: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    width: "100vw"
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    fontFamily: "Calibri",
    fontSize: "10vh"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 250,
    marginRight: 250
  },
  listContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginRight: 20
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignText: "center",
    marginTop: 20,
    marginLeft: 20,
    padding: 5
  },
  formControl: {
    marginTop: 25,
    width: "20vw"
  }
});

export default landingPageStyle;
