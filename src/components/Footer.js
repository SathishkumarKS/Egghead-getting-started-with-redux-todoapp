import { connect } from "react-redux";
import React from "react";

const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter: filter
});

const Link = ({ active, children, onClick }) => {
  if (active) return <span> {children} </span>;

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => (
  <p>
    <FilterLink filter="ALL">ALL</FilterLink>{" "}
    <FilterLink filter="ACTIVE">ACTIVE</FilterLink>{" "}
    <FilterLink filter="COMPLETED">COMPLETED</FilterLink>
  </p>
);

export default Footer;
