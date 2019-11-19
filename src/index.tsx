import React, { Fragment, ComponentType, useState, RefObject } from "react";
import { Grid, TablePagination, Typography } from "@material-ui/core";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import TableFixedLeft from "./widgets/TableFixedLeft.widget";
import TableNormal from "./widgets/TableNormal.widget";
import TableFixedRight from "./widgets/TableFixedRight.widget";
import { TablePropTypes } from "./typeDefs/Types";

export const TableWidget: ComponentType<TablePropTypes> = (
  props: TablePropTypes
) => {
  const {
    classes,
    columns,
    data,
    showPagination = false,
    rowsPerPageOptions = [10, 15, 20],
    totalsData
  } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollRight, setScrollRight] = useState(0);
  let canFixed = useMediaQuery("(min-width:960px)");

  /**
   * @description to get the scroll width and scroll left for shadow
   * @param ref
   */
  const onScroll = (ref: RefObject<HTMLDivElement>) => {
    const node = ref.current;
    if (ref && node) {
      setScrollLeft(ref && node.scrollLeft);
      setScrollRight(ref && node.scrollWidth - node.clientWidth);
    }
  };

  if (!columns || columns.length === 0) {
    throw new Error(
      "Parameter 'columns' should be an array, and its length should be greater than 0."
    );
  }
  if (!data) {
    throw new Error(
      "Parameter 'data' should be an array, but now it is undefined."
    );
  }

  /**
   * @description Handle the page change action
   * @param event
   * @param page
   */
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  /**
   * @description Handle the RowsPerPage change action
   * @param event
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number(event.target!.value));
  };

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justify="space-around"
        style={{ position: "sticky", border: "solid 1px #ddd" }}
      >
        <Grid item xs={12}>
          {data.length > 0 ? (
            <Fragment>
              <TableNormal
                classes={classes}
                columns={columns}
                data={
                  showPagination
                    ? data.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    : data
                }
                onScroll={onScroll}
                totalsData={totalsData}
              />
              {canFixed && (
                <Fragment>
                  <TableFixedLeft
                    classes={classes}
                    showLeftShadow={scrollLeft > 0}
                    columns={columns.filter(c => {
                      const { isFixed, fixedPosition = "start" } = c;
                      return isFixed && fixedPosition === "start";
                    })}
                    data={
                      showPagination
                        ? data.slice(
                            page * rowsPerPage,
                            (page + 1) * rowsPerPage
                          )
                        : data
                    }
                    totalsData={totalsData}
                  />
                  <TableFixedRight
                    classes={classes}
                    showRightShadow={scrollRight > scrollLeft}
                    columns={columns.filter(c => {
                      const { isFixed, fixedPosition = "start" } = c;
                      return isFixed && fixedPosition === "end";
                    })}
                    data={
                      showPagination
                        ? data.slice(
                            page * rowsPerPage,
                            (page + 1) * rowsPerPage
                          )
                        : data
                    }
                    totalsData={totalsData}
                  />
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Typography variant="h6" align="center">
              No data!
            </Typography>
          )}
        </Grid>
        {data.length > 0 && showPagination && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            colSpan={3}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              native: true
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Grid>
    </Fragment>
  );
};
