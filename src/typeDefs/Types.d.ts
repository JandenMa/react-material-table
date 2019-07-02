/// <reference types="react" />
export declare type ColumnPropTypes = {
    index: number;
    name: string;
    displayName: string;
    isFixed?: boolean;
    fixedPosition?: 'start' | 'end';
    fixedColWidth?: number;
    align?: 'left' | 'inherit' | 'center' | 'right' | 'justify';
};
export declare type DataCellPropTypes = {
    name: string;
    render: JSX.Element;
};
declare type TableBaseClassPropTypes = {
    headerTitle?: string;
    container?: string;
    scrollBar?: string;
    row?: string;
    cell?: string;
    header?: string;
    footer?: string;
};
export declare type TableBasePropTypes = {
    columns: Array<ColumnPropTypes>;
    classes: TableBaseClassPropTypes;
    data: Array<Array<DataCellPropTypes>>;
    hideFixedCell?: boolean;
    showLeftShadow?: boolean;
    showRightShadow?: boolean;
    onScroll?: Function;
    totalsData?: Array<DataCellPropTypes>;
};
export declare type TablePropTypes = {
    columns: Array<ColumnPropTypes>;
    classes?: any;
    data: Array<Array<DataCellPropTypes>>;
    showPagination?: boolean;
    rowsPerPageOptions?: Array<number>;
    totalsData?: Array<DataCellPropTypes>;
};
export {};
