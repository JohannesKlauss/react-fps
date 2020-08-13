declare type CssProp = number | string;
export default function useStyles(width: number, height: number, top: CssProp, right: CssProp, bottom: CssProp, left: CssProp, fpsLength: number): {
    wrapperStyle: {
        zIndex: number;
        position: string;
        width: string;
        height: string;
        padding: string;
        backgroundColor: string;
        color: string;
        fontSize: string;
        lineHeight: string;
        fontFamily: string;
        fontWeight: number;
        boxSizing: string;
        top: CssProp;
        right: CssProp;
        bottom: CssProp;
        left: CssProp;
    };
    graphStyle: {
        position: string;
        left: string;
        right: string;
        bottom: string;
        height: number;
        backgroundColor: string;
        MozBoxSizing: string;
        boxSizing: string;
    };
    barStyle: (calcHeight: any, i: any) => {
        position: string;
        bottom: string;
        right: string;
        height: string;
        width: string;
        backgroundColor: string;
        MozBoxSizing: string;
        boxSizing: string;
    };
};
export {};
