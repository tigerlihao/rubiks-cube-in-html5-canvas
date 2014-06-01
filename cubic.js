var COLOR_WHITE = 0,
    COLOR_RED = 1,
    COLOR_GREEN = 2,
    COLOR_ORANGE = 3,
    COLOR_BLUE = 4,
    COLOR_YELLOW = 5,
    VH = 400,
    VW = 800,
    f = 260,
    h = 260,
    dE,
    OPX = 400,
    OPY = 500,
    VIEW = {},
    FrameDuration = 40,
    AnimTotal,
    AnimCount,
    Anim,
    AnimArray = [],
    LOCK = false,
    ROTATE = false,
    MOVE = false;
var C0 = ['#FFFFEE', '#FF0000', '#228822', '#FF6600', '#0066FF', '#FFFF00'];
var cu = {
    FLU: COLOR_WHITE,
    FUM: COLOR_WHITE,
    FRU: COLOR_WHITE,
    FLM: COLOR_WHITE,
    FMM: COLOR_WHITE,
    FRM: COLOR_WHITE,
    FLD: COLOR_WHITE,
    FDM: COLOR_WHITE,
    FRD: COLOR_WHITE,
    BLU: COLOR_YELLOW,
    BUM: COLOR_YELLOW,
    BRU: COLOR_YELLOW,
    BLM: COLOR_YELLOW,
    BMM: COLOR_YELLOW,
    BRM: COLOR_YELLOW,
    BLD: COLOR_YELLOW,
    BDM: COLOR_YELLOW,
    BRD: COLOR_YELLOW,
    LFU: COLOR_RED,
    LUM: COLOR_RED,
    LBU: COLOR_RED,
    LFM: COLOR_RED,
    LMM: COLOR_RED,
    LBM: COLOR_RED,
    LFD: COLOR_RED,
    LDM: COLOR_RED,
    LBD: COLOR_RED,
    RFU: COLOR_ORANGE,
    RUM: COLOR_ORANGE,
    RBU: COLOR_ORANGE,
    RFM: COLOR_ORANGE,
    RMM: COLOR_ORANGE,
    RBM: COLOR_ORANGE,
    RFD: COLOR_ORANGE,
    RDM: COLOR_ORANGE,
    RBD: COLOR_ORANGE,
    UFL: COLOR_GREEN,
    UFM: COLOR_GREEN,
    UFR: COLOR_GREEN,
    ULM: COLOR_GREEN,
    UMM: COLOR_GREEN,
    URM: COLOR_GREEN,
    UBL: COLOR_GREEN,
    UBM: COLOR_GREEN,
    UBR: COLOR_GREEN,
    DFL: COLOR_BLUE,
    DFM: COLOR_BLUE,
    DFR: COLOR_BLUE,
    DLM: COLOR_BLUE,
    DMM: COLOR_BLUE,
    DRM: COLOR_BLUE,
    DBL: COLOR_BLUE,
    DBM: COLOR_BLUE,
    DBR: COLOR_BLUE
};
function p(x, y, z) {
    var point = {
        x: x,
        y: y,
        z: z,
        to2Dx: function() {
            var x = this.x,
                y = this.y + f;
            return VW * x / (VW + y);
        },
        to2Dy: function() {
            var y = this.y + f,
                z = this.z + h;
            return -(VW * z + VH * y) / (VW + y);
        },
        zRo: function(a) {
            var x = this.x * Math.cos(a) - this.y * Math.sin(a),
                y = this.x * Math.sin(a) + this.y * Math.cos(a);
            this.x = x;
            this.y = y;
        },
        yRo: function(a) {
            var x = this.x * Math.cos(a) - this.z * Math.sin(a),
                z = this.x * Math.sin(a) + this.z * Math.cos(a);
            this.x = x;
            this.z = z;
        },
        xRo: function(a) {
            var z = this.z * Math.cos(a) - this.y * Math.sin(a),
                y = this.z * Math.sin(a) + this.y * Math.cos(a);
            this.z = z;
            this.y = y;
        },
        ro: function(k, a) {
            k.formal();
            var cos = Math.cos(a),
                sin = Math.sin(a),
                kv = k.x * this.x + k.y * this.y + k.z * this.z,
                x = this.x * cos +
                    (k.y * this.z - k.z * this.y) * sin +
                    kv * k.x * (1 - cos),
                y = this.y * cos +
                    (k.z * this.x - k.x * this.z) * sin +
                    kv * k.y * (1 - cos),
                z = this.z * cos +
                    (k.x * this.y - k.y * this.x) * sin +
                    kv * k.z * (1 - cos);
            this.x = x;
            this.y = y;
            this.z = z;
        },
        clone: function() {
            return p(this.x, this.y, this.z);
        },
        formal: function() {
            var r = Math.sqrt(this.x * this.x + this.y * this.y +
                this.z * this.z);
            this.x /= r;
            this.y /= r;
            this.z /= r;
        }
    };
    return point;
}
var FLU = p(-150, -150, 150),
    FL1U = p(-50, -150, 150),
    FL1U1 = p(-50, -150, 50),
    FLU1 = p(-150, -150, 50),
    F1LU1 = p(-150, -50, 50),
    F1LU = p(-150, -50, 150),
    F1L1U = p(-50, -50, 150),
    FRU = p(150, -150, 150),
    FR1U = p(50, -150, 150),
    FR1U1 = p(50, -150, 50),
    FRU1 = p(150, -150, 50),
    F1RU1 = p(150, -50, 50),
    F1RU = p(150, -50, 150),
    F1R1U = p(50, -50, 150),
    FLD = p(-150, -150, -150),
    FL1D = p(-50, -150, -150),
    FL1D1 = p(-50, -150, -50),
    FLD1 = p(-150, -150, -50),
    F1LD1 = p(-150, -50, -50),
    F1LD = p(-150, -50, -150),
    F1L1D = p(-50, -50, -150),
    FRD = p(150, -150, -150),
    FR1D = p(50, -150, -150),
    FR1D1 = p(50, -150, -50),
    FRD1 = p(150, -150, -50),
    F1RD1 = p(150, -50, -50),
    F1RD = p(150, -50, -150),
    F1R1D = p(50, -50, -150),
    BLU = p(-150, 150, 150),
    BL1U = p(-50, 150, 150),
    BL1U1 = p(-50, 150, 50),
    BLU1 = p(-150, 150, 50),
    B1LU1 = p(-150, 50, 50),
    B1LU = p(-150, 50, 150),
    B1L1U = p(-50, 50, 150),
    BRU = p(150, 150, 150),
    BR1U = p(50, 150, 150),
    BR1U1 = p(50, 150, 50),
    BRU1 = p(150, 150, 50),
    B1RU1 = p(150, 50, 50),
    B1RU = p(150, 50, 150),
    B1R1U = p(50, 50, 150),
    BLD = p(-150, 150, -150),
    BL1D = p(-50, 150, -150),
    BL1D1 = p(-50, 150, -50),
    BLD1 = p(-150, 150, -50),
    B1LD1 = p(-150, 50, -50),
    B1LD = p(-150, 50, -150),
    B1L1D = p(-50, 50, -150),
    BRD = p(150, 150, -150),
    BR1D = p(50, 150, -150),
    BR1D1 = p(50, 150, -50),
    BRD1 = p(150, 150, -50),
    B1RD1 = p(150, 50, -50),
    B1RD = p(150, 50, -150),
    B1R1D = p(50, 50, -150),
    F = p(0, -1, 0),
    B = p(0, 1, 0),
    L = p(-1, 0, 0),
    R = p(1, 0, 0),
    U = p(0, 0, 1),
    D = p(0, 0, -1),
    St = {};
function tU() {
    var tmp = cu.FLU;
    cu.FLU = cu.RFU;
    cu.RFU = cu.BRU;
    cu.BRU = cu.LBU;
    cu.LBU = tmp;
    tmp = cu.FUM;
    cu.FUM = cu.RUM;
    cu.RUM = cu.BUM;
    cu.BUM = cu.LUM;
    cu.LUM = tmp;
    tmp = cu.FRU;
    cu.FRU = cu.RBU;
    cu.RBU = cu.BLU;
    cu.BLU = cu.LFU;
    cu.LFU = tmp;
    tmp = cu.UFR;
    cu.UFR = cu.UBR;
    cu.UBR = cu.UBL;
    cu.UBL = cu.UFL;
    cu.UFL = tmp;
    tmp = cu.UFM;
    cu.UFM = cu.URM;
    cu.URM = cu.UBM;
    cu.UBM = cu.ULM;
    cu.ULM = tmp;
}
function tU1() {
    var tmp = cu.LBU;
    cu.LBU = cu.BRU;
    cu.BRU = cu.RFU;
    cu.RFU = cu.FLU;
    cu.FLU = tmp;
    tmp = cu.LUM;
    cu.LUM = cu.BUM;
    cu.BUM = cu.RUM;
    cu.RUM = cu.FUM;
    cu.FUM = tmp;
    tmp = cu.LFU;
    cu.LFU = cu.BLU;
    cu.BLU = cu.RBU;
    cu.RBU = cu.FRU;
    cu.FRU = tmp;
    tmp = cu.UFL;
    cu.UFL = cu.UBL;
    cu.UBL = cu.UBR;
    cu.UBR = cu.UFR;
    cu.UFR = tmp;
    tmp = cu.ULM;
    cu.ULM = cu.UBM;
    cu.UBM = cu.URM;
    cu.URM = cu.UFM;
    cu.UFM = tmp;
}
function tD() {
    var tmp = cu.FLD;
    cu.FLD = cu.RFD;
    cu.RFD = cu.BRD;
    cu.BRD = cu.LBD;
    cu.LBD = tmp;
    tmp = cu.FDM;
    cu.FDM = cu.RDM;
    cu.RDM = cu.BDM;
    cu.BDM = cu.LDM;
    cu.LDM = tmp;
    tmp = cu.FRD;
    cu.FRD = cu.RBD;
    cu.RBD = cu.BLD;
    cu.BLD = cu.LFD;
    cu.LFD = tmp;
    tmp = cu.DFR;
    cu.DFR = cu.DBR;
    cu.DBR = cu.DBL;
    cu.DBL = cu.DFL;
    cu.DFL = tmp;
    tmp = cu.DFM;
    cu.DFM = cu.DRM;
    cu.DRM = cu.DBM;
    cu.DBM = cu.DLM;
    cu.DLM = tmp;
}
function tD1() {
    var tmp = cu.LBD;
    cu.LBD = cu.BRD;
    cu.BRD = cu.RFD;
    cu.RFD = cu.FLD;
    cu.FLD = tmp;
    tmp = cu.LDM;
    cu.LDM = cu.BDM;
    cu.BDM = cu.RDM;
    cu.RDM = cu.FDM;
    cu.FDM = tmp;
    tmp = cu.LFD;
    cu.LFD = cu.BLD;
    cu.BLD = cu.RBD;
    cu.RBD = cu.FRD;
    cu.FRD = tmp;
    tmp = cu.DFL;
    cu.DFL = cu.DBL;
    cu.DBL = cu.DBR;
    cu.DBR = cu.DFR;
    cu.DFR = tmp;
    tmp = cu.DLM;
    cu.DLM = cu.DBM;
    cu.DBM = cu.DRM;
    cu.DRM = cu.DFM;
    cu.DFM = tmp;
}
function tMUD() {
    var tmp = cu.FLM;
    cu.FLM = cu.RFM;
    cu.RFM = cu.BRM;
    cu.BRM = cu.LBM;
    cu.LBM = tmp;
    tmp = cu.FMM;
    cu.FMM = cu.RMM;
    cu.RMM = cu.BMM;
    cu.BMM = cu.LMM;
    cu.LMM = tmp;
    tmp = cu.FRM;
    cu.FRM = cu.RBM;
    cu.RBM = cu.BLM;
    cu.BLM = cu.LFM;
    cu.LFM = tmp;
}
function tMUD1() {
    var tmp = cu.LBM;
    cu.LBM = cu.BRM;
    cu.BRM = cu.RFM;
    cu.RFM = cu.FLM;
    cu.FLM = tmp;
    tmp = cu.LMM;
    cu.LMM = cu.BMM;
    cu.BMM = cu.RMM;
    cu.RMM = cu.FMM;
    cu.FMM = tmp;
    tmp = cu.LFM;
    cu.LFM = cu.BLM;
    cu.BLM = cu.RBM;
    cu.RBM = cu.FRM;
    cu.FRM = tmp;
}
function FtoL() {
    tU();
    tMUD();
    tD();
}
var LtoB = FtoL,
    BtoR = FtoL,
    RtoF = FtoL;
function FtoR() {
    tU1();
    tMUD1();
    tD1();
}
var RtoB = FtoR,
    BtoL = FtoR,
    LtoF = FtoR;
function tF() {
    var tmp = cu.FLD;
    cu.FLD = cu.FRD;
    cu.FRD = cu.FRU;
    cu.FRU = cu.FLU;
    cu.FLU = tmp;
    tmp = cu.FDM;
    cu.FDM = cu.FRM;
    cu.FRM = cu.FUM;
    cu.FUM = cu.FLM;
    cu.FLM = tmp;
    tmp = cu.LFD;
    cu.LFD = cu.DFR;
    cu.DFR = cu.RFU;
    cu.RFU = cu.UFL;
    cu.UFL = tmp;
    tmp = cu.LFM;
    cu.LFM = cu.DFM;
    cu.DFM = cu.RFM;
    cu.RFM = cu.UFM;
    cu.UFM = tmp;
    tmp = cu.LFU;
    cu.LFU = cu.DFL;
    cu.DFL = cu.RFD;
    cu.RFD = cu.UFR;
    cu.UFR = tmp;
}
function tF1() {
    var tmp = cu.FLU;
    cu.FLU = cu.FRU;
    cu.FRU = cu.FRD;
    cu.FRD = cu.FLD;
    cu.FLD = tmp;
    tmp = cu.FLM;
    cu.FLM = cu.FUM;
    cu.FUM = cu.FRM;
    cu.FRM = cu.FDM;
    cu.FDM = tmp;
    tmp = cu.UFL;
    cu.UFL = cu.RFU;
    cu.RFU = cu.DFR;
    cu.DFR = cu.LFD;
    cu.LFD = tmp;
    tmp = cu.UFM;
    cu.UFM = cu.RFM;
    cu.RFM = cu.DFM;
    cu.DFM = cu.LFM;
    cu.LFM = tmp;
    tmp = cu.UFR;
    cu.UFR = cu.RFD;
    cu.RFD = cu.DFL;
    cu.DFL = cu.LFU;
    cu.LFU = tmp;
}
function tB() {
    var tmp = cu.BLD;
    cu.BLD = cu.BRD;
    cu.BRD = cu.BRU;
    cu.BRU = cu.BLU;
    cu.BLU = tmp;
    tmp = cu.BDM;
    cu.BDM = cu.BRM;
    cu.BRM = cu.BUM;
    cu.BUM = cu.BLM;
    cu.BLM = tmp;
    tmp = cu.LBD;
    cu.LBD = cu.DBR;
    cu.DBR = cu.RBU;
    cu.RBU = cu.UBL;
    cu.UBL = tmp;
    tmp = cu.LBM;
    cu.LBM = cu.DBM;
    cu.DBM = cu.RBM;
    cu.RBM = cu.UBM;
    cu.UBM = tmp;
    tmp = cu.LBU;
    cu.LBU = cu.DBL;
    cu.DBL = cu.RBD;
    cu.RBD = cu.UBR;
    cu.UBR = tmp;
}
function tB1() {
    var tmp = cu.BLU;
    cu.BLU = cu.BRU;
    cu.BRU = cu.BRD;
    cu.BRD = cu.BLD;
    cu.BLD = tmp;
    tmp = cu.BLM;
    cu.BLM = cu.BUM;
    cu.BUM = cu.BRM;
    cu.BRM = cu.BDM;
    cu.BDM = tmp;
    tmp = cu.UBL;
    cu.UBL = cu.RBU;
    cu.RBU = cu.DBR;
    cu.DBR = cu.LBD;
    cu.LBD = tmp;
    tmp = cu.UBM;
    cu.UBM = cu.RBM;
    cu.RBM = cu.DBM;
    cu.DBM = cu.LBM;
    cu.LBM = tmp;
    tmp = cu.UBR;
    cu.UBR = cu.RBD;
    cu.RBD = cu.DBL;
    cu.DBL = cu.LBU;
    cu.LBU = tmp;
}
function tMFB() {
    var tmp = cu.LDM;
    cu.LDM = cu.DRM;
    cu.DRM = cu.RUM;
    cu.RUM = cu.ULM;
    cu.ULM = tmp;
    tmp = cu.LMM;
    cu.LMM = cu.DMM;
    cu.DMM = cu.RMM;
    cu.RMM = cu.UMM;
    cu.UMM = tmp;
    tmp = cu.LUM;
    cu.LUM = cu.DLM;
    cu.DLM = cu.RDM;
    cu.RDM = cu.URM;
    cu.URM = tmp;
}
function tMFB1() {
    var tmp = cu.ULM;
    cu.ULM = cu.RUM;
    cu.RUM = cu.DRM;
    cu.DRM = cu.LDM;
    cu.LDM = tmp;
    tmp = cu.UMM;
    cu.UMM = cu.RMM;
    cu.RMM = cu.DMM;
    cu.DMM = cu.LMM;
    cu.LMM = tmp;
    tmp = cu.URM;
    cu.URM = cu.RDM;
    cu.RDM = cu.DLM;
    cu.DLM = cu.LUM;
    cu.LUM = tmp;
}
function UtoL() {
    tF1();
    tMFB1();
    tB1();
}
var LtoD = UtoL,
    DtoR = UtoL,
    RtoU = UtoL;
function UtoR() {
    tF();
    tMFB();
    tB();
}
var RtoD = UtoR,
    DtoL = UtoR,
    LtoU = UtoR;
function tR() {
    var tmp = cu.RFU;
    cu.RFU = cu.RFD;
    cu.RFD = cu.RBD;
    cu.RBD = cu.RBU;
    cu.RBU = tmp;
    tmp = cu.RFM;
    cu.RFM = cu.RDM;
    cu.RDM = cu.RBM;
    cu.RBM = cu.RUM;
    cu.RUM = tmp;
    tmp = cu.FRU;
    cu.FRU = cu.DFR;
    cu.DFR = cu.BRD;
    cu.BRD = cu.UBR;
    cu.UBR = tmp;
    tmp = cu.FRM;
    cu.FRM = cu.DRM;
    cu.DRM = cu.BRM;
    cu.BRM = cu.URM;
    cu.URM = tmp;
    tmp = cu.FRD;
    cu.FRD = cu.DBR;
    cu.DBR = cu.BRU;
    cu.BRU = cu.UFR;
    cu.UFR = tmp;
}
function tR1() {
    var tmp = cu.RBU;
    cu.RBU = cu.RBD;
    cu.RBD = cu.RFD;
    cu.RFD = cu.RFU;
    cu.RFU = tmp;
    tmp = cu.RUM;
    cu.RUM = cu.RBM;
    cu.RBM = cu.RDM;
    cu.RDM = cu.RFM;
    cu.RFM = tmp;
    tmp = cu.UBR;
    cu.UBR = cu.BRD;
    cu.BRD = cu.DFR;
    cu.DFR = cu.FRU;
    cu.FRU = tmp;
    tmp = cu.URM;
    cu.URM = cu.BRM;
    cu.BRM = cu.DRM;
    cu.DRM = cu.FRM;
    cu.FRM = tmp;
    tmp = cu.UFR;
    cu.UFR = cu.BRU;
    cu.BRU = cu.DBR;
    cu.DBR = cu.FRD;
    cu.FRD = tmp;
}
function tL() {
    var tmp = cu.LFU;
    cu.LFU = cu.LFD;
    cu.LFD = cu.LBD;
    cu.LBD = cu.LBU;
    cu.LBU = tmp;
    tmp = cu.LFM;
    cu.LFM = cu.LDM;
    cu.LDM = cu.LBM;
    cu.LBM = cu.LUM;
    cu.LUM = tmp;
    tmp = cu.FLU;
    cu.FLU = cu.DFL;
    cu.DFL = cu.BLD;
    cu.BLD = cu.UBL;
    cu.UBL = tmp;
    tmp = cu.FLM;
    cu.FLM = cu.DLM;
    cu.DLM = cu.BLM;
    cu.BLM = cu.ULM;
    cu.ULM = tmp;
    tmp = cu.FLD;
    cu.FLD = cu.DBL;
    cu.DBL = cu.BLU;
    cu.BLU = cu.UFL;
    cu.UFL = tmp;
}
function tL1() {
    var tmp = cu.LBU;
    cu.LBU = cu.LBD;
    cu.LBD = cu.LFD;
    cu.LFD = cu.LFU;
    cu.LFU = tmp;
    tmp = cu.LUM;
    cu.LUM = cu.LBM;
    cu.LBM = cu.LDM;
    cu.LDM = cu.LFM;
    cu.LFM = tmp;
    tmp = cu.UBL;
    cu.UBL = cu.BLD;
    cu.BLD = cu.DFL;
    cu.DFL = cu.FLU;
    cu.FLU = tmp;
    tmp = cu.ULM;
    cu.ULM = cu.BLM;
    cu.BLM = cu.DLM;
    cu.DLM = cu.FLM;
    cu.FLM = tmp;
    tmp = cu.UFL;
    cu.UFL = cu.BLU;
    cu.BLU = cu.DBL;
    cu.DBL = cu.FLD;
    cu.FLD = tmp;
}
function tMRL() {
    var tmp = cu.FUM;
    cu.FUM = cu.DFM;
    cu.DFM = cu.BDM;
    cu.BDM = cu.UBM;
    cu.UBM = tmp;
    tmp = cu.FMM;
    cu.FMM = cu.DMM;
    cu.DMM = cu.BMM;
    cu.BMM = cu.UMM;
    cu.UMM = tmp;
    tmp = cu.FDM;
    cu.FDM = cu.DBM;
    cu.DBM = cu.BUM;
    cu.BUM = cu.UFM;
    cu.UFM = tmp;
}
function tMRL1() {
    var tmp = cu.UBM;
    cu.UBM = cu.BDM;
    cu.BDM = cu.DFM;
    cu.DFM = cu.FUM;
    cu.FUM = tmp;
    tmp = cu.UMM;
    cu.UMM = cu.BMM;
    cu.BMM = cu.DMM;
    cu.DMM = cu.FMM;
    cu.FMM = tmp;
    tmp = cu.UFM;
    cu.UFM = cu.BUM;
    cu.BUM = cu.DBM;
    cu.DBM = cu.FDM;
    cu.FDM = tmp;
}
function FtoU() {
    tL();
    tR();
    tMRL();
}
var UtoB = FtoU,
    BtoD = FtoU,
    DtoF = FtoU;
function FtoD() {
    tL1();
    tR1();
    tMRL1();
}
var DtoB = FtoD,
    BtoU = FtoD,
    UtoF = FtoD;
function saveSt() {
    St.FLU = FLU.clone();
    St.FRU = FRU.clone();
    St.FLD = FLD.clone();
    St.FRD = FRD.clone();
    St.BLU = BLU.clone();
    St.BRU = BRU.clone();
    St.BLD = BLD.clone();
    St.BRD = BRD.clone();
    St.F1LU = F1LU.clone();
    St.F1L1U = F1L1U.clone();
    St.F1LU1 = F1LU1.clone();
    St.FLU1 = FLU1.clone();
    St.FL1U1 = FL1U1.clone();
    St.FL1U = FL1U.clone();
    St.FRU1 = FRU1.clone();
    St.FR1U1 = FR1U1.clone();
    St.FR1U = FR1U.clone();
    St.F1R1U = F1R1U.clone();
    St.F1RU1 = F1RU1.clone();
    St.F1RU = F1RU.clone();
    St.F1RD = F1RD.clone();
    St.F1R1D = F1R1D.clone();
    St.F1RD1 = F1RD1.clone();
    St.FRD1 = FRD1.clone();
    St.FR1D = FR1D.clone();
    St.FR1D1 = FR1D1.clone();
    St.F1LD = F1LD.clone();
    St.F1L1D = F1L1D.clone();
    St.F1LD1 = F1LD1.clone();
    St.FLD1 = FLD1.clone();
    St.FL1D1 = FL1D1.clone();
    St.FL1D = FL1D.clone();
    St.B1LU = B1LU.clone();
    St.B1L1U = B1L1U.clone();
    St.B1LU1 = B1LU1.clone();
    St.BLU1 = BLU1.clone();
    St.BL1U1 = BL1U1.clone();
    St.BL1U = BL1U.clone();
    St.BRU1 = BRU1.clone();
    St.BR1U1 = BR1U1.clone();
    St.BR1U = BR1U.clone();
    St.B1R1U = B1R1U.clone();
    St.B1RU1 = B1RU1.clone();
    St.B1RU = B1RU.clone();
    St.B1RD = B1RD.clone();
    St.B1R1D = B1R1D.clone();
    St.B1RD1 = B1RD1.clone();
    St.BRD1 = BRD1.clone();
    St.BR1D = BR1D.clone();
    St.BR1D1 = BR1D1.clone();
    St.B1LD = B1LD.clone();
    St.B1L1D = B1L1D.clone();
    St.B1LD1 = B1LD1.clone();
    St.BLD1 = BLD1.clone();
    St.BL1D1 = BL1D1.clone();
    St.BL1D = BL1D.clone();
    St.F = F.clone();
    St.B = B.clone();
    St.L = L.clone();
    St.R = R.clone();
    St.U = U.clone();
    St.D = D.clone();
}
function restoreSt() {
    FLU = St.FLU.clone();
    FRU = St.FRU.clone();
    FLD = St.FLD.clone();
    FRD = St.FRD.clone();
    BLU = St.BLU.clone();
    BRU = St.BRU.clone();
    BLD = St.BLD.clone();
    BRD = St.BRD.clone();
    F1LU = St.F1LU.clone();
    F1L1U = St.F1L1U.clone();
    F1LU1 = St.F1LU1.clone();
    FLU1 = St.FLU1.clone();
    FL1U1 = St.FL1U1.clone();
    FL1U = St.FL1U.clone();
    FRU1 = St.FRU1.clone();
    FR1U1 = St.FR1U1.clone();
    FR1U = St.FR1U.clone();
    F1R1U = St.F1R1U.clone();
    F1RU1 = St.F1RU1.clone();
    F1RU = St.F1RU.clone();
    F1RD = St.F1RD.clone();
    F1R1D = St.F1R1D.clone();
    F1RD1 = St.F1RD1.clone();
    FRD1 = St.FRD1.clone();
    FR1D = St.FR1D.clone();
    FR1D1 = St.FR1D1.clone();
    F1LD = St.F1LD.clone();
    F1L1D = St.F1L1D.clone();
    F1LD1 = St.F1LD1.clone();
    FLD1 = St.FLD1.clone();
    FL1D1 = St.FL1D1.clone();
    FL1D = St.FL1D.clone();
    B1LU = St.B1LU.clone();
    B1L1U = St.B1L1U.clone();
    B1LU1 = St.B1LU1.clone();
    BLU1 = St.BLU1.clone();
    BL1U1 = St.BL1U1.clone();
    BL1U = St.BL1U.clone();
    BRU1 = St.BRU1.clone();
    BR1U1 = St.BR1U1.clone();
    BR1U = St.BR1U.clone();
    B1R1U = St.B1R1U.clone();
    B1RU1 = St.B1RU1.clone();
    B1RU = St.B1RU.clone();
    B1RD = St.B1RD.clone();
    B1R1D = St.B1R1D.clone();
    B1RD1 = St.B1RD1.clone();
    BRD1 = St.BRD1.clone();
    BR1D = St.BR1D.clone();
    BR1D1 = St.BR1D1.clone();
    B1LD = St.B1LD.clone();
    B1L1D = St.B1L1D.clone();
    B1LD1 = St.B1LD1.clone();
    BLD1 = St.BLD1.clone();
    BL1D1 = St.BL1D1.clone();
    BL1D = St.BL1D.clone();
    F = St.F.clone();
    B = St.B.clone();
    L = St.L.clone();
    R = St.R.clone();
    U = St.U.clone();
    D = St.D.clone();
}
function drPly(_c, p, l) {
    _c.beginPath();
    if (p && p.length > 3) {
        _c.moveTo(p[0][0], p[0][1]);
        for (var i = 1; i < p.length; i++) {
            _c.lineTo(p[i][0], p[i][1]);
        }
        _c.closePath();
        _c.fill();
        if (l) {
            _c.stroke();
        }
    }
}
function isCw(ax, ay, bx, by, cx, cy) {
    return (ax * by - ay * bx + bx * cy - by * cx + cx * ay - cy * ax) >= 0;
}
function isQuadVisable(a, b, c, d) {
    return isCw(a.to2Dx(), a.to2Dy(), b.to2Dx(), b.to2Dy(), c.to2Dx(),
        c.to2Dy());
}
function drQuad(_c, a, b, c, d) {
    var ax = a.to2Dx(),
        ay = a.to2Dy(),
        bx = b.to2Dx(),
        by = b.to2Dy(),
        cx = c.to2Dx(),
        cy = c.to2Dy();
    if (!isCw(ax, ay, bx, by, cx, cy)) {
        return;
    } else {
        var dx = d.to2Dx(),
            dy = d.to2Dy();
        drPly(_c, [[ax, ay], [bx, by], [cx, cy], [dx, dy]], true);
    }
}
function drFLU(_c) {
    _c.fillStyle = C0[cu.FLU];
    drQuad(_c, FLU, FL1U, FL1U1, FLU1);
}
function drFLM(_c) {
    _c.fillStyle = C0[cu.FLM];
    drQuad(_c, FLU1, FL1U1, FL1D1, FLD1);
}
function drFLD(_c) {
    _c.fillStyle = C0[cu.FLD];
    drQuad(_c, FLD1, FL1D1, FL1D, FLD);
}
function drFUM(_c) {
    _c.fillStyle = C0[cu.FUM];
    drQuad(_c, FL1U, FR1U, FR1U1, FL1U1);
}
function drFMM(_c) {
    _c.fillStyle = C0[cu.FMM];
    drQuad(_c, FL1U1, FR1U1, FR1D1, FL1D1);
}
function drFDM(_c) {
    _c.fillStyle = C0[cu.FDM];
    drQuad(_c, FL1D1, FR1D1, FR1D, FL1D);
}
function drFRU(_c) {
    _c.fillStyle = C0[cu.FRU];
    drQuad(_c, FR1U, FRU, FRU1, FR1U1);
}
function drFRM(_c) {
    _c.fillStyle = C0[cu.FRM];
    drQuad(_c, FR1U1, FRU1, FRD1, FR1D1);
}
function drFRD(_c) {
    _c.fillStyle = C0[cu.FRD];
    drQuad(_c, FR1D1, FRD1, FRD, FR1D);
}
function drBRU(_c) {
    _c.fillStyle = C0[cu.BRU];
    drQuad(_c, BRU, BR1U, BR1U1, BRU1);
}
function drBRM(_c) {
    _c.fillStyle = C0[cu.BRM];
    drQuad(_c, BRU1, BR1U1, BR1D1, BRD1);
}
function drBRD(_c) {
    _c.fillStyle = C0[cu.BRD];
    drQuad(_c, BRD1, BR1D1, BR1D, BRD);
}
function drBUM(_c) {
    _c.fillStyle = C0[cu.BUM];
    drQuad(_c, BR1U, BL1U, BL1U1, BR1U1);
}
function drBMM(_c) {
    _c.fillStyle = C0[cu.BMM];
    drQuad(_c, BR1U1, BL1U1, BL1D1, BR1D1);
}
function drBDM(_c) {
    _c.fillStyle = C0[cu.BDM];
    drQuad(_c, BR1D1, BL1D1, BL1D, BR1D);
}
function drBLU(_c) {
    _c.fillStyle = C0[cu.BLU];
    drQuad(_c, BL1U, BLU, BLU1, BL1U1);
}
function drBLM(_c) {
    _c.fillStyle = C0[cu.BLM];
    drQuad(_c, BL1U1, BLU1, BLD1, BL1D1);
}
function drBLD(_c) {
    _c.fillStyle = C0[cu.BLD];
    drQuad(_c, BL1D1, BLD1, BLD, BL1D);
}
function drRFU(_c) {
    _c.fillStyle = C0[cu.RFU];
    drQuad(_c, FRU, F1RU, F1RU1, FRU1);
}
function drRFM(_c) {
    _c.fillStyle = C0[cu.RFM];
    drQuad(_c, FRU1, F1RU1, F1RD1, FRD1);
}
function drRFD(_c) {
    _c.fillStyle = C0[cu.RFD];
    drQuad(_c, FRD1, F1RD1, F1RD, FRD);
}
function drRUM(_c) {
    _c.fillStyle = C0[cu.RUM];
    drQuad(_c, F1RU, B1RU, B1RU1, F1RU1);
}
function drRMM(_c) {
    _c.fillStyle = C0[cu.RMM];
    drQuad(_c, F1RU1, B1RU1, B1RD1, F1RD1);
}
function drRDM(_c) {
    _c.fillStyle = C0[cu.RDM];
    drQuad(_c, F1RD1, B1RD1, B1RD, F1RD);
}
function drRBU(_c) {
    _c.fillStyle = C0[cu.RBU];
    drQuad(_c, B1RU, BRU, BRU1, B1RU1);
}
function drRBM(_c) {
    _c.fillStyle = C0[cu.RBM];
    drQuad(_c, B1RU1, BRU1, BRD1, B1RD1);
}
function drRBD(_c) {
    _c.fillStyle = C0[cu.RBD];
    drQuad(_c, B1RD1, BRD1, BRD, B1RD);
}
function drLBU(_c) {
    _c.fillStyle = C0[cu.LBU];
    drQuad(_c, BLU, B1LU, B1LU1, BLU1);
}
function drLBM(_c) {
    _c.fillStyle = C0[cu.LBM];
    drQuad(_c, BLU1, B1LU1, B1LD1, BLD1);
}
function drLBD(_c) {
    _c.fillStyle = C0[cu.LBD];
    drQuad(_c, BLD1, B1LD1, B1LD, BLD);
}
function drLUM(_c) {
    _c.fillStyle = C0[cu.LUM];
    drQuad(_c, B1LU, F1LU, F1LU1, B1LU1);
}
function drLMM(_c) {
    _c.fillStyle = C0[cu.LMM];
    drQuad(_c, B1LU1, F1LU1, F1LD1, B1LD1);
}
function drLDM(_c) {
    _c.fillStyle = C0[cu.LDM];
    drQuad(_c, B1LD1, F1LD1, F1LD, B1LD);
}
function drLFU(_c) {
    _c.fillStyle = C0[cu.LFU];
    drQuad(_c, F1LU, FLU, FLU1, F1LU1);
}
function drLFM(_c) {
    _c.fillStyle = C0[cu.LFM];
    drQuad(_c, F1LU1, FLU1, FLD1, F1LD1);
}
function drLFD(_c) {
    _c.fillStyle = C0[cu.LFD];
    drQuad(_c, F1LD1, FLD1, FLD, F1LD);
}
function drUBR(_c) {
    _c.fillStyle = C0[cu.UBR];
    drQuad(_c, BRU, B1RU, B1R1U, BR1U);
}
function drUBM(_c) {
    _c.fillStyle = C0[cu.UBM];
    drQuad(_c, BR1U, B1R1U, B1L1U, BL1U);
}
function drUBL(_c) {
    _c.fillStyle = C0[cu.UBL];
    drQuad(_c, BL1U, B1L1U, B1LU, BLU);
}
function drURM(_c) {
    _c.fillStyle = C0[cu.URM];
    drQuad(_c, B1RU, F1RU, F1R1U, B1R1U);
}
function drUMM(_c) {
    _c.fillStyle = C0[cu.UMM];
    drQuad(_c, B1R1U, F1R1U, F1L1U, B1L1U);
}
function drULM(_c) {
    _c.fillStyle = C0[cu.ULM];
    drQuad(_c, B1L1U, F1L1U, F1LU, B1LU);
}
function drUFR(_c) {
    _c.fillStyle = C0[cu.UFR];
    drQuad(_c, F1RU, FRU, FR1U, F1R1U);
}
function drUFM(_c) {
    _c.fillStyle = C0[cu.UFM];
    drQuad(_c, F1R1U, FR1U, FL1U, F1L1U);
}
function drUFL(_c) {
    _c.fillStyle = C0[cu.UFL];
    drQuad(_c, F1L1U, FL1U, FLU, F1LU);
}
function drDFR(_c) {
    _c.fillStyle = C0[cu.DFR];
    drQuad(_c, FRD, F1RD, F1R1D, FR1D);
}
function drDFM(_c) {
    _c.fillStyle = C0[cu.DFM];
    drQuad(_c, FR1D, F1R1D, F1L1D, FL1D);
}
function drDFL(_c) {
    _c.fillStyle = C0[cu.DFL];
    drQuad(_c, FL1D, F1L1D, F1LD, FLD);
}
function drDRM(_c) {
    _c.fillStyle = C0[cu.DRM];
    drQuad(_c, F1RD, B1RD, B1R1D, F1R1D);
}
function drDMM(_c) {
    _c.fillStyle = C0[cu.DMM];
    drQuad(_c, F1R1D, B1R1D, B1L1D, F1L1D);
}
function drDLM(_c) {
    _c.fillStyle = C0[cu.DLM];
    drQuad(_c, F1L1D, B1L1D, B1LD, F1LD);
}
function drDBR(_c) {
    _c.fillStyle = C0[cu.DBR];
    drQuad(_c, B1RD, BRD, BR1D, B1R1D);
}
function drDBM(_c) {
    _c.fillStyle = C0[cu.DBM];
    drQuad(_c, B1R1D, BR1D, BL1D, B1L1D);
}
function drDBL(_c) {
    _c.fillStyle = C0[cu.DBL];
    drQuad(_c, B1L1D, BL1D, BLD, B1LD);
}
function dr() {
    var _c = document.getElementById('canvas').getContext('2d');
    _c.save();
    _c.lineCap = 'round';
    _c.lineJoin = 'round';
    _c.fillStyle = '#CCCCCC';
    _c.beginPath();
    _c.moveTo(0, 0);
    _c.lineTo(0, 100);
    _c.lineTo(1000, 100);
    _c.lineTo(1000, 0);
    _c.closePath();
    _c.fill();
    _c.fillStyle = '#444444';
    _c.beginPath();
    _c.moveTo(0, 100);
    _c.lineTo(1000, 100);
    _c.lineTo(1000, 500);
    _c.lineTo(0, 500);
    _c.closePath();
    _c.fill();
    _c.translate(OPX, OPY);
    drSh(_c, FLU, FRU, FLD, FRD, BLU, BRU, BLD, BRD);
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    drFLU(_c);
    drFLM(_c);
    drFLD(_c);
    drFUM(_c);
    drFMM(_c);
    drFDM(_c);
    drFRU(_c);
    drFRM(_c);
    drFRD(_c);
    drBRU(_c);
    drBRM(_c);
    drBRD(_c);
    drBUM(_c);
    drBMM(_c);
    drBDM(_c);
    drBLU(_c);
    drBLM(_c);
    drBLD(_c);
    drRFU(_c);
    drRFM(_c);
    drRFD(_c);
    drRUM(_c);
    drRMM(_c);
    drRDM(_c);
    drRBU(_c);
    drRBM(_c);
    drRBD(_c);
    drLBU(_c);
    drLBM(_c);
    drLBD(_c);
    drLUM(_c);
    drLMM(_c);
    drLDM(_c);
    drLFU(_c);
    drLFM(_c);
    drLFD(_c);
    drUBR(_c);
    drUBM(_c);
    drUBL(_c);
    drURM(_c);
    drUMM(_c);
    drULM(_c);
    drUFR(_c);
    drUFM(_c);
    drUFL(_c);
    drDFR(_c);
    drDFM(_c);
    drDFL(_c);
    drDRM(_c);
    drDMM(_c);
    drDLM(_c);
    drDBR(_c);
    drDBM(_c);
    drDBL(_c);
    _c.restore();
}
function zRo(a) {
    a *= Math.PI / 180;
    FLU.zRo(a);
    FRU.zRo(a);
    FLD.zRo(a);
    FRD.zRo(a);
    BLU.zRo(a);
    BRU.zRo(a);
    BLD.zRo(a);
    BRD.zRo(a);
    F1LU.zRo(a);
    F1L1U.zRo(a);
    F1LU1.zRo(a);
    FLU1.zRo(a);
    FL1U1.zRo(a);
    FL1U.zRo(a);
    FRU1.zRo(a);
    FR1U1.zRo(a);
    FR1U.zRo(a);
    F1R1U.zRo(a);
    F1RU1.zRo(a);
    F1RU.zRo(a);
    F1RD.zRo(a);
    F1R1D.zRo(a);
    F1RD1.zRo(a);
    FRD1.zRo(a);
    FR1D.zRo(a);
    FR1D1.zRo(a);
    F1LD.zRo(a);
    F1L1D.zRo(a);
    F1LD1.zRo(a);
    FLD1.zRo(a);
    FL1D1.zRo(a);
    FL1D.zRo(a);
    B1LU.zRo(a);
    B1L1U.zRo(a);
    B1LU1.zRo(a);
    BLU1.zRo(a);
    BL1U1.zRo(a);
    BL1U.zRo(a);
    BRU1.zRo(a);
    BR1U1.zRo(a);
    BR1U.zRo(a);
    B1R1U.zRo(a);
    B1RU1.zRo(a);
    B1RU.zRo(a);
    B1RD.zRo(a);
    B1R1D.zRo(a);
    B1RD1.zRo(a);
    BRD1.zRo(a);
    BR1D.zRo(a);
    BR1D1.zRo(a);
    B1LD.zRo(a);
    B1L1D.zRo(a);
    B1LD1.zRo(a);
    BLD1.zRo(a);
    BL1D1.zRo(a);
    BL1D.zRo(a);
    F.zRo(a);
    B.zRo(a);
    L.zRo(a);
    R.zRo(a);
    U.zRo(a);
    D.zRo(a);
}
function yRo(a) {
    a *= Math.PI / 180;
    FLU.yRo(a);
    FRU.yRo(a);
    FLD.yRo(a);
    FRD.yRo(a);
    BLU.yRo(a);
    BRU.yRo(a);
    BLD.yRo(a);
    BRD.yRo(a);
    F1LU.yRo(a);
    F1L1U.yRo(a);
    F1LU1.yRo(a);
    FLU1.yRo(a);
    FL1U1.yRo(a);
    FL1U.yRo(a);
    FRU1.yRo(a);
    FR1U1.yRo(a);
    FR1U.yRo(a);
    F1R1U.yRo(a);
    F1RU1.yRo(a);
    F1RU.yRo(a);
    F1RD.yRo(a);
    F1R1D.yRo(a);
    F1RD1.yRo(a);
    FRD1.yRo(a);
    FR1D.yRo(a);
    FR1D1.yRo(a);
    F1LD.yRo(a);
    F1L1D.yRo(a);
    F1LD1.yRo(a);
    FLD1.yRo(a);
    FL1D1.yRo(a);
    FL1D.yRo(a);
    B1LU.yRo(a);
    B1L1U.yRo(a);
    B1LU1.yRo(a);
    BLU1.yRo(a);
    BL1U1.yRo(a);
    BL1U.yRo(a);
    BRU1.yRo(a);
    BR1U1.yRo(a);
    BR1U.yRo(a);
    B1R1U.yRo(a);
    B1RU1.yRo(a);
    B1RU.yRo(a);
    B1RD.yRo(a);
    B1R1D.yRo(a);
    B1RD1.yRo(a);
    BRD1.yRo(a);
    BR1D.yRo(a);
    BR1D1.yRo(a);
    B1LD.yRo(a);
    B1L1D.yRo(a);
    B1LD1.yRo(a);
    BLD1.yRo(a);
    BL1D1.yRo(a);
    BL1D.yRo(a);
    F.yRo(a);
    B.yRo(a);
    L.yRo(a);
    R.yRo(a);
    U.yRo(a);
    D.yRo(a);
}
function xRo(a) {
    a *= Math.PI / 180;
    FLU.xRo(a);
    FRU.xRo(a);
    FLD.xRo(a);
    FRD.xRo(a);
    BLU.xRo(a);
    BRU.xRo(a);
    BLD.xRo(a);
    BRD.xRo(a);
    F1LU.xRo(a);
    F1L1U.xRo(a);
    F1LU1.xRo(a);
    FLU1.xRo(a);
    FL1U1.xRo(a);
    FL1U.xRo(a);
    FRU1.xRo(a);
    FR1U1.xRo(a);
    FR1U.xRo(a);
    F1R1U.xRo(a);
    F1RU1.xRo(a);
    F1RU.xRo(a);
    F1RD.xRo(a);
    F1R1D.xRo(a);
    F1RD1.xRo(a);
    FRD1.xRo(a);
    FR1D.xRo(a);
    FR1D1.xRo(a);
    F1LD.xRo(a);
    F1L1D.xRo(a);
    F1LD1.xRo(a);
    FLD1.xRo(a);
    FL1D1.xRo(a);
    FL1D.xRo(a);
    B1LU.xRo(a);
    B1L1U.xRo(a);
    B1LU1.xRo(a);
    BLU1.xRo(a);
    BL1U1.xRo(a);
    BL1U.xRo(a);
    BRU1.xRo(a);
    BR1U1.xRo(a);
    BR1U.xRo(a);
    B1R1U.xRo(a);
    B1RU1.xRo(a);
    B1RU.xRo(a);
    B1RD.xRo(a);
    B1R1D.xRo(a);
    B1RD1.xRo(a);
    BRD1.xRo(a);
    BR1D.xRo(a);
    BR1D1.xRo(a);
    B1LD.xRo(a);
    B1L1D.xRo(a);
    B1LD1.xRo(a);
    BLD1.xRo(a);
    BL1D1.xRo(a);
    BL1D.xRo(a);
    F.xRo(a);
    B.xRo(a);
    L.xRo(a);
    R.xRo(a);
    U.xRo(a);
    D.xRo(a);
}
function ro(k, a) {
    var b = a * Math.PI / 180;
    FLU.ro(k, b);
    FRU.ro(k, b);
    FLD.ro(k, b);
    FRD.ro(k, b);
    BLU.ro(k, b);
    BRU.ro(k, b);
    BLD.ro(k, b);
    BRD.ro(k, b);
    F1LU.ro(k, b);
    F1L1U.ro(k, b);
    F1LU1.ro(k, b);
    FLU1.ro(k, b);
    FL1U1.ro(k, b);
    FL1U.ro(k, b);
    FRU1.ro(k, b);
    FR1U1.ro(k, b);
    FR1U.ro(k, b);
    F1R1U.ro(k, b);
    F1RU1.ro(k, b);
    F1RU.ro(k, b);
    F1RD.ro(k, b);
    F1R1D.ro(k, b);
    F1RD1.ro(k, b);
    FRD1.ro(k, b);
    FR1D.ro(k, b);
    FR1D1.ro(k, b);
    F1LD.ro(k, b);
    F1L1D.ro(k, b);
    F1LD1.ro(k, b);
    FLD1.ro(k, b);
    FL1D1.ro(k, b);
    FL1D.ro(k, b);
    B1LU.ro(k, b);
    B1L1U.ro(k, b);
    B1LU1.ro(k, b);
    BLU1.ro(k, b);
    BL1U1.ro(k, b);
    BL1U.ro(k, b);
    BRU1.ro(k, b);
    BR1U1.ro(k, b);
    BR1U.ro(k, b);
    B1R1U.ro(k, b);
    B1RU1.ro(k, b);
    B1RU.ro(k, b);
    B1RD.ro(k, b);
    B1R1D.ro(k, b);
    B1RD1.ro(k, b);
    BRD1.ro(k, b);
    BR1D.ro(k, b);
    BR1D1.ro(k, b);
    B1LD.ro(k, b);
    B1L1D.ro(k, b);
    B1LD1.ro(k, b);
    BLD1.ro(k, b);
    BL1D1.ro(k, b);
    BL1D.ro(k, b);
    F.ro(k, b);
    B.ro(k, b);
    L.ro(k, b);
    R.ro(k, b);
    U.ro(k, b);
    D.ro(k, b);
}
function drOrbit(x, y, r) {
    var _c = document.getElementById('canvas').getContext('2d');
    _c.save();
    _c.lineWidth = 2;
    _c.strokeStyle = 'rgba(0,0,0,0.5)';
    _c.beginPath();
    _c.arc(x, y, r, 0, Math.PI * 2, true);
    _c.moveTo(x, y - r - 10);
    _c.lineTo(x, y + r + 10);
    _c.moveTo(x - r - 10, y);
    _c.lineTo(x + r + 10, y);
    _c.stroke();
    _c.restore();
}
function startDrug(e) {
    if (e.button == 0) {
        e.target.onmouseout = endDrug;
        dE = e;
        var _cv = document.getElementById('canvas');
        if (isOutOFCube(e.layerX, e.layerY)) {
            ROTATE = true;
            e.target.onmousemove = drugMove;
        } else {
            MOVE = true;
        }
    }
}
function drugMove(e) {
    if (ROTATE) {
        var dx = e.layerX - dE.layerX,
        dy = e.layerY - dE.layerY;
        if (dx == 0 && dy == 0) {
            return;
        }
        dy = VIEW.h - dy;
        dy = dy > 45 ? 45 : dy < -20 ? -20 : dy;
        restoreSt();
        ro(U, dx);
        xRo(dy - VIEW.h);
        dr();
    }
}
function endDrug(e) {
    e.target.onmouseout = null;
    var dx = e.layerX - dE.layerX,
    dy = e.layerY - dE.layerY;
    if (e.button == 0) {
        if (ROTATE) {
            dy = VIEW.h - dy;
            dx = VIEW.w + dx;
            dy = dy > 45 ? 45 : dy < -20 ? -20 : dy;
            restoreSt();
            ro(U, dx - VIEW.w);
            xRo(dy - VIEW.h);
            VIEW.w = dx % 360;
            VIEW.h = dy;
            saveSt();
            dr();
            ROTATE = false;
            e.target.onmousemove = null;
        }
        if (MOVE) {
            MOVE = false;
            if (dx == 0 && dy == 0) {
                return;
            }
            var _cv = document.getElementById('canvas');
            switch (findTarget(dE.layerX, dE.layerY, e.layerX, e.layerY)) {
            case 'U':
                move('U', 1, 500, function() {
                        restoreSt();
                        tU();
                        dr();
                    });
                break;
            case "U'":
                move('U', -1, 500, function() {
                        restoreSt();
                        tU1();
                        dr();
                    });
                break;
            case 'D':
                move('D', 1, 500, function() {
                        restoreSt();
                        tD1();
                        dr();
                    });
                break;
            case "D'":
                move('D', -1, 500, function() {
                        restoreSt();
                        tD();
                        dr();
                    });
                break;
            case 'F':
                move('F', 1, 500, function() {
                        restoreSt();
                        tF();
                        dr();
                    });
                break;
            case "F'":
                move('F', -1, 500, function() {
                        restoreSt();
                        tF1();
                        dr();
                    });
                break;
            case 'B':
                move('B', 1, 500, function() {
                        restoreSt();
                        tB1();
                        dr();
                    });
                break;
            case "B'":
                move('B', -1, 500, function() {
                        restoreSt();
                        tB();
                        dr();
                    });
                break;
            case 'R':
                move('R', 1, 500, function() {
                        restoreSt();
                        tR();
                        dr();
                    });
                break;
            case "R'":
                move('R', -1, 500, function() {
                        restoreSt();
                        tR1();
                        dr();
                    });
                break;
            case 'L':
                move('L', 1, 500, function() {
                        restoreSt();
                        tL1();
                        dr();
                    });
                break;
            case "L'":
                move('L', -1, 500, function() {
                        restoreSt();
                        tL();
                        dr();
                    });
                break;
            case 'LR':
                roTo(R, 90, 500, function() {
                        restoreSt();
                        FtoD();
                        dr();
                    });
                break;
            case 'RL':
                roTo(L, 90, 500, function() {
                        restoreSt();
                        FtoU();
                        dr();
                    });
                break;
            case 'UD':
                roTo(D, 90, 500, function() {
                        restoreSt();
                        FtoL();
                        dr();
                    });
                break;
            case 'DU':
                roTo(U, 90, 500, function() {
                        restoreSt();
                        FtoR();
                        dr();
                    });
                break;
            case 'BF':
                roTo(F, 90, 500, function() {
                        restoreSt();
                        UtoL();
                        dr();
                    });
                break;
            case 'FB':
                roTo(B, 90, 500, function() {
                        restoreSt();
                        UtoR();
                        dr();
                    });
                break;
            default:
            }
        }
    }
}
function xRoTo(a, t, fn) {
    if (Anim) {
        return;
    }
    AnimTotal = Math.ceil(t / 40);
    AnimCount = 0;
    Anim = setInterval(function() {
                AnimCount++;
                if (!LOCK) {
                    LOCK = true;
                    restoreSt();
                    xRo(a * AnimCount / AnimTotal);
                    dr();
                    LOCK = false;
                }
                if (AnimCount == AnimTotal) {
                    clearInterval(Anim);
                    Anim = null;
                    if (fn) {
                        fn();
                    }
                }
            }, FrameDuration);
}
function yRoTo(a, t, fn) {
    if (Anim) {
        return;
    }
    AnimTotal = Math.ceil(t / 40);
    AnimCount = 0;
    Anim = setInterval(function() {
                AnimCount++;
                if (!LOCK) {
                    LOCK = true;
                    restoreSt();
                    yRo(a * AnimCount / AnimTotal);
                    dr();
                    LOCK = false;
                }
                if (AnimCount == AnimTotal) {
                    clearInterval(Anim);
                    Anim = null;
                    if (fn) {
                        fn();
                    }
                }
            }, FrameDuration);
}
function zRoTo(a, t, fn) {
    if (Anim) {
        return;
    }
    AnimTotal = Math.ceil(t / 40);
    AnimCount = 0;
    Anim = setInterval(function() {
                AnimCount++;
                if (!LOCK) {
                    LOCK = true;
                    restoreSt();
                    zRo(a * AnimCount / AnimTotal);
                    dr();
                    LOCK = false;
                }
                if (AnimCount == AnimTotal) {
                    clearInterval(Anim);
                    Anim = null;
                    if (fn) {
                        fn();
                    }
                }
            }, FrameDuration);
}
function roTo(k, a, t, fn) {
    if (Anim) {
        return;
    }
    AnimTotal = Math.ceil(t / 40);
    AnimCount = 0;
    Anim = setInterval(function() {
                AnimCount++;
                if (!LOCK) {
                    LOCK = true;
                    restoreSt();
                    ro(k, a * AnimCount / AnimTotal);
                    dr();
                    LOCK = false;
                }
                if (AnimCount == AnimTotal) {
                    clearInterval(Anim);
                    Anim = null;
                    if (fn) {
                        fn();
                    }
                }
            }, FrameDuration);
}
function resetView(t) {
    if (Anim) {
        return;
    }
    AnimTotal = Math.ceil(t / 40);
    AnimCount = 0;
    Anim = setInterval(function() {
                AnimCount++;
                var dw = -30 - VIEW.w;
                var dh = -10 - VIEW.h;
                if (!LOCK) {
                    LOCK = true;
                    restoreSt();
                    ro(U, dw * AnimCount / AnimTotal);
                    xRo(dh * AnimCount / AnimTotal);
                    dr();
                    LOCK = false;
                }
                if (AnimCount == AnimTotal) {
                    clearInterval(Anim);
                    Anim = null;
                    restoreSt();
                    ro(U, dw);
                    xRo(dh);
                    dr();
                    saveSt();
                    VIEW.h = -10;
                    VIEW.w = -30;
                }
            }, FrameDuration);
}
function move(axis, n, t, fn) {
    if (Anim) {
        return;
    }
    var a = -90 * n;
    AnimTotal = Math.ceil(t / 40);
    AnimCount = 0;
    Anim = setInterval(function() {
                AnimCount++;
                if (!LOCK) {
                    LOCK = true;
                    switch (axis) {
                    case 'U':
                        drUAnim(a * AnimCount / AnimTotal);
                        break;
                    case 'D':
                        drDAnim(a * AnimCount / AnimTotal);
                        break;
                    case 'F':
                        drFAnim(a * AnimCount / AnimTotal);
                        break;
                    case 'B':
                        drBAnim(a * AnimCount / AnimTotal);
                        break;
                    case 'L':
                        drLAnim(a * AnimCount / AnimTotal);
                        break;
                    case 'R':
                        drRAnim(a * AnimCount / AnimTotal);
                        break;
                    default:
                        break;
                    }
                    LOCK = false;
                }
                if (AnimCount == AnimTotal) {
                    clearInterval(Anim);
                    Anim = null;
                    if (fn) {
                        fn();
                    }
                }
            }, FrameDuration);
}
function drUAnim(a) {
    var _c = document.getElementById('canvas').getContext('2d');
    _c.save();
    _c.lineCap = 'round';
    _c.lineJoin = 'round';
    drBackground(_c);
    _c.translate(OPX, OPY);
    drSh(_c, FLU1, FRU1, FLD, FRD, BLU1, BRU1, BLD, BRD);
    ro(U, a);
    drSh(_c, FLU, FRU, FLU1, FRU1, BLU, BRU, BLU1, BRU1);
    restoreSt();
    if (isQuadVisable(BLU1, BRU1, FRU1, FLU1)) {
        drMD(_c);
        ro(U, a);
        drU(_c);
        restoreSt();
    } else {
        ro(U, a);
        drU(_c);
        restoreSt();
        drMD(_c);
    }
    _c.restore();
}
function drDAnim(a) {
    var _c = document.getElementById('canvas').getContext('2d');
    _c.save();
    _c.lineCap = 'round';
    _c.lineJoin = 'round';
    drBackground(_c);
    _c.translate(OPX, OPY);
    drSh(_c, FLU, FRU, FLD1, FRD1, BLU, BRU, BLD1, BRD1);
    ro(D, a);
    drSh(_c, FLD1, FRD1, FLD, FRD, BLD1, BRD1, BLD, BRD);
    restoreSt();
    if (isQuadVisable(FLD1, FRD1, BRD1, BLD1)) {
        drMU(_c);
        ro(D, a);
        drD(_c);
        restoreSt();
    } else {
        ro(D, a);
        drD(_c);
        restoreSt();
        drMU(_c);
    }
    _c.restore();
}
function drFAnim(a) {
    var _c = document.getElementById('canvas').getContext('2d');
    _c.save();
    _c.lineCap = 'round';
    _c.lineJoin = 'round';
    drBackground(_c);
    _c.translate(OPX, OPY);
    drSh(_c, F1LU, F1RU, F1LD, F1RD, BLU, BRU, BLD, BRD);
    ro(F, a);
    drSh(_c, FLU, FRU, FLD, FRD, F1LU, F1RU, F1LD, F1RD);
    restoreSt();
    if (isQuadVisable(F1LU, F1RU, F1RD, F1LD)) {
        drMB(_c);
        ro(F, a);
        drF(_c);
        restoreSt();
    } else {
        ro(F, a);
        drF(_c);
        restoreSt();
        drMB(_c);
    }
    _c.restore();
}
function drBAnim(a) {
    var _c = document.getElementById('canvas').getContext('2d');
    _c.save();
    _c.lineCap = 'round';
    _c.lineJoin = 'round';
    drBackground(_c);
    _c.translate(OPX, OPY);
    drSh(_c, FLU, FRU, FLD, FRD, B1LU, B1RU, B1LD, B1RD);
    ro(B, a);
    drSh(_c, B1LU, B1RU, B1LD, B1RD, BLU, BRU, BLD, BRD);
    restoreSt();
    if (isQuadVisable(B1RU, B1LU, B1LD, B1RD)) {
        drMF(_c);
        ro(B, a);
        drB(_c);
        restoreSt();
    } else {
        ro(B, a);
        drB(_c);
        restoreSt();
        drMF(_c);
    }
    _c.restore();
}
function drLAnim(a) {
    var _c = document.getElementById('canvas').getContext('2d');
    _c.save();
    _c.lineCap = 'round';
    _c.lineJoin = 'round';
    drBackground(_c);
    _c.translate(OPX, OPY);
    drSh(_c, FL1U, FRU, FL1D, FRD, BL1U, BRU, BL1D, BRD);
    ro(L, a);
    drSh(_c, FLU, FL1U, FLD, FL1D, BLU, BL1U, BLD, BL1D);
    restoreSt();
    if (isQuadVisable(BL1U, FL1U, FL1D, BL1D)) {
        drMR(_c);
        ro(L, a);
        drL(_c);
        restoreSt();
    } else {
        ro(L, a);
        drL(_c);
        restoreSt();
        drMR(_c);
    }
    _c.restore();
}
function drRAnim(a) {
    var _c = document.getElementById('canvas').getContext('2d');
    _c.save();
    _c.lineCap = 'round';
    _c.lineJoin = 'round';
    drBackground(_c);
    _c.translate(OPX, OPY);
    drSh(_c, FLU, FR1U, FLD, FR1D, BLU, BR1U, BLD, BR1D);
    ro(R, a);
    drSh(_c, FR1U, FRU, FR1D, FRD, BR1U, BRU, BR1D, BRD);
    restoreSt();
    if (isQuadVisable(FR1U, BR1U, BR1D, FR1D)) {
        drML(_c);
        ro(R, a);
        drR(_c);
        restoreSt();
    } else {
        ro(R, a);
        drR(_c);
        restoreSt();
        drML(_c);
    }
    _c.restore();
}
function drBackground(_c) {
    _c.save();
    _c.fillStyle = '#CCCCCC';
    _c.beginPath();
    _c.moveTo(0, 0);
    _c.lineTo(0, 100);
    _c.lineTo(1000, 100);
    _c.lineTo(1000, 0);
    _c.closePath();
    _c.fill();
    _c.fillStyle = '#444444';
    _c.beginPath();
    _c.moveTo(0, 100);
    _c.lineTo(1000, 100);
    _c.lineTo(1000, 500);
    _c.lineTo(0, 500);
    _c.closePath();
    _c.fill();
    _c.restore();
}
function drU(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, FLU1, FRU1, BRU1, BLU1);
    drFLU(_c);
    drFUM(_c);
    drFRU(_c);
    drBRU(_c);
    drBUM(_c);
    drBLU(_c);
    drRFU(_c);
    drRUM(_c);
    drRBU(_c);
    drLBU(_c);
    drLUM(_c);
    drLFU(_c);
    drUBR(_c);
    drUBM(_c);
    drUBL(_c);
    drURM(_c);
    drUMM(_c);
    drULM(_c);
    drUFR(_c);
    drUFM(_c);
    drUFL(_c);
    _c.restore();
}
function drMD(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, BLU1, BRU1, FRU1, FLU1);
    drLBM(_c);
    drLBD(_c);
    drLMM(_c);
    drLDM(_c);
    drLFM(_c);
    drLFD(_c);
    drRFM(_c);
    drRFD(_c);
    drRMM(_c);
    drRDM(_c);
    drRBM(_c);
    drRBD(_c);
    drBRM(_c);
    drBRD(_c);
    drBMM(_c);
    drBDM(_c);
    drBLM(_c);
    drBLD(_c);
    drDFR(_c);
    drDFM(_c);
    drDFL(_c);
    drDRM(_c);
    drDMM(_c);
    drDLM(_c);
    drDBR(_c);
    drDBM(_c);
    drDBL(_c);
    drFLM(_c);
    drFLD(_c);
    drFMM(_c);
    drFDM(_c);
    drFRM(_c);
    drFRD(_c);
    _c.restore();
}
function drD(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, BLD1, BRD1, FRD1, FLD1);
    drLBD(_c);
    drLDM(_c);
    drLFD(_c);
    drRFD(_c);
    drRDM(_c);
    drRBD(_c);
    drBRD(_c);
    drBDM(_c);
    drBLD(_c);
    drDFR(_c);
    drDFM(_c);
    drDFL(_c);
    drDRM(_c);
    drDMM(_c);
    drDLM(_c);
    drDBR(_c);
    drDBM(_c);
    drDBL(_c);
    drFLD(_c);
    drFDM(_c);
    drFRD(_c);
    _c.restore();
}
function drMU(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, FLD1, FRD1, BRD1, BLD1);
    drLBM(_c);
    drLMM(_c);
    drLFM(_c);
    drRFM(_c);
    drBRM(_c);
    drBMM(_c);
    drBLM(_c);
    drRBM(_c);
    drRMM(_c);
    drFLM(_c);
    drFMM(_c);
    drFRM(_c);
    drFLU(_c);
    drFUM(_c);
    drFRU(_c);
    drBRU(_c);
    drBUM(_c);
    drBLU(_c);
    drRFU(_c);
    drRUM(_c);
    drRBU(_c);
    drLBU(_c);
    drLUM(_c);
    drLFU(_c);
    drUBR(_c);
    drUBM(_c);
    drUBL(_c);
    drURM(_c);
    drUMM(_c);
    drULM(_c);
    drUFR(_c);
    drUFM(_c);
    drUFL(_c);
    _c.restore();
}
function drF(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, F1LD, F1RD, F1RU, F1LU);
    drFLU(_c);
    drFUM(_c);
    drFRU(_c);
    drFLM(_c);
    drFMM(_c);
    drFRM(_c);
    drFLD(_c);
    drFDM(_c);
    drFRD(_c);
    drUFL(_c);
    drUFM(_c);
    drUFR(_c);
    drRFU(_c);
    drRFM(_c);
    drRFD(_c);
    drDFR(_c);
    drDFM(_c);
    drDFL(_c);
    drLFU(_c);
    drLFM(_c);
    drLFD(_c);
    _c.restore();
}
function drMF(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, B1LD, B1RD, B1RU, B1LU);
    drFLU(_c);
    drFUM(_c);
    drFRU(_c);
    drFLM(_c);
    drFMM(_c);
    drFRM(_c);
    drFLD(_c);
    drFDM(_c);
    drFRD(_c);
    drUFL(_c);
    drUFM(_c);
    drUFR(_c);
    drRFU(_c);
    drRFM(_c);
    drRFD(_c);
    drDFR(_c);
    drDFM(_c);
    drDFL(_c);
    drLFU(_c);
    drLFM(_c);
    drLFD(_c);
    drULM(_c);
    drUMM(_c);
    drURM(_c);
    drRUM(_c);
    drRMM(_c);
    drRDM(_c);
    drDRM(_c);
    drDMM(_c);
    drDLM(_c);
    drLDM(_c);
    drLMM(_c);
    drLUM(_c);
    _c.restore();
}
function drMB(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, F1LU, F1RU, F1RD, F1LD);
    drBLU(_c);
    drBUM(_c);
    drBRU(_c);
    drBLM(_c);
    drBMM(_c);
    drBRM(_c);
    drBLD(_c);
    drBDM(_c);
    drBRD(_c);
    drUBL(_c);
    drUBM(_c);
    drUBR(_c);
    drRBU(_c);
    drRBM(_c);
    drRBD(_c);
    drDBR(_c);
    drDBM(_c);
    drDBL(_c);
    drLBU(_c);
    drLBM(_c);
    drLBD(_c);
    drULM(_c);
    drUMM(_c);
    drURM(_c);
    drRUM(_c);
    drRMM(_c);
    drRDM(_c);
    drDRM(_c);
    drDMM(_c);
    drDLM(_c);
    drLDM(_c);
    drLMM(_c);
    drLUM(_c);
    _c.restore();
}
function drB(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, B1LU, B1RU, B1RD, B1LD);
    drBLU(_c);
    drBUM(_c);
    drBRU(_c);
    drBLM(_c);
    drBMM(_c);
    drBRM(_c);
    drBLD(_c);
    drBDM(_c);
    drBRD(_c);
    drUBL(_c);
    drUBM(_c);
    drUBR(_c);
    drRBU(_c);
    drRBM(_c);
    drRBD(_c);
    drDBR(_c);
    drDBM(_c);
    drDBL(_c);
    drLBU(_c);
    drLBM(_c);
    drLBD(_c);
    _c.restore();
}
function drL(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, FL1U, BL1U, BL1D, FL1D);
    drLBU(_c);
    drLUM(_c);
    drLFU(_c);
    drLBM(_c);
    drLMM(_c);
    drLFM(_c);
    drLBD(_c);
    drLDM(_c);
    drLFD(_c);
    drFLU(_c);
    drFLM(_c);
    drFLD(_c);
    drUFL(_c);
    drULM(_c);
    drUBL(_c);
    drBLU(_c);
    drBLM(_c);
    drBLD(_c);
    drDBL(_c);
    drDLM(_c);
    drDFL(_c);
    _c.restore();
}
function drMR(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, FL1D, BL1D, BL1U, FL1U);
    drRBU(_c);
    drRUM(_c);
    drRFU(_c);
    drRBM(_c);
    drRMM(_c);
    drRFM(_c);
    drRBD(_c);
    drRDM(_c);
    drRFD(_c);
    drFRU(_c);
    drFRM(_c);
    drFRD(_c);
    drUFR(_c);
    drURM(_c);
    drUBR(_c);
    drBRU(_c);
    drBRM(_c);
    drBRD(_c);
    drDBR(_c);
    drDRM(_c);
    drDFR(_c);
    drFUM(_c);
    drFMM(_c);
    drFDM(_c);
    drDFM(_c);
    drDMM(_c);
    drDBM(_c);
    drBDM(_c);
    drBMM(_c);
    drBUM(_c);
    drUBM(_c);
    drUMM(_c);
    drUFM(_c);
    _c.restore();
}
function drR(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, BR1U, FR1U, FR1D, BR1D);
    drRBU(_c);
    drRUM(_c);
    drRFU(_c);
    drRBM(_c);
    drRMM(_c);
    drRFM(_c);
    drRBD(_c);
    drRDM(_c);
    drRFD(_c);
    drFRU(_c);
    drFRM(_c);
    drFRD(_c);
    drUFR(_c);
    drURM(_c);
    drUBR(_c);
    drBRU(_c);
    drBRM(_c);
    drBRD(_c);
    drDBR(_c);
    drDRM(_c);
    drDFR(_c);
    _c.restore();
}
function drML(_c) {
    _c.save();
    _c.lineWidth = 3;
    _c.strokeStyle = '#000000';
    _c.fillStyle = '#000000';
    drQuad(_c, FR1U, BR1U, BR1D, FR1D);
    drLBU(_c);
    drLUM(_c);
    drLFU(_c);
    drLBM(_c);
    drLMM(_c);
    drLFM(_c);
    drLBD(_c);
    drLDM(_c);
    drLFD(_c);
    drFLU(_c);
    drFLM(_c);
    drFLD(_c);
    drUFL(_c);
    drULM(_c);
    drUBL(_c);
    drBLU(_c);
    drBLM(_c);
    drBLD(_c);
    drDBL(_c);
    drDLM(_c);
    drDFL(_c);
    drFUM(_c);
    drFMM(_c);
    drFDM(_c);
    drDFM(_c);
    drDMM(_c);
    drDBM(_c);
    drBDM(_c);
    drBMM(_c);
    drBUM(_c);
    drUBM(_c);
    drUMM(_c);
    drUFM(_c);
    _c.restore();
}
function findTarget(x, y, x1, y1) {
    x -= OPX;
    y -= OPY;
    x1 -= OPX;
    y1 -= OPY;
    var flux = FLU.to2Dx(),
    fluy = FLU.to2Dy(),
    fldx = FLD.to2Dx(),
    fldy = FLD.to2Dy(),
    frux = FRU.to2Dx(),
    fruy = FRU.to2Dy(),
    frdx = FRD.to2Dx(),
    frdy = FRD.to2Dy(),
    blux = BLU.to2Dx(),
    bluy = BLU.to2Dy(),
    bldx = BLD.to2Dx(),
    bldy = BLD.to2Dy(),
    brux = BRU.to2Dx(),
    bruy = BRU.to2Dy(),
    brdx = BRD.to2Dx(),
    brdy = BRD.to2Dy();
    if (isCw(flux, fluy, blux, bluy, brux, bruy) &&
            isCw(flux, fluy, blux, bluy, x, y) &&
            isCw(blux, bluy, brux, bruy, x, y) &&
            isCw(brux, bruy, frux, fruy, x, y) &&
            isCw(frux, fruy, flux, fluy, x, y)) {
        var f1l1ux = F1L1U.to2Dx(),
        f1l1uy = F1L1U.to2Dy(),
        f1r1ux = F1R1U.to2Dx(),
        f1r1uy = F1R1U.to2Dy(),
        b1l1ux = B1L1U.to2Dx(),
        b1l1uy = B1L1U.to2Dy(),
        b1r1ux = B1R1U.to2Dx(),
        b1r1uy = B1R1U.to2Dy();
        var delta = 0;
        delta += isCw(f1l1ux, f1l1uy, b1l1ux, b1l1uy, x, y) ? 1 : 0;
        delta += isCw(b1l1ux, b1l1uy, b1r1ux, b1r1uy, x, y) ? 2 : 0;
        delta += isCw(b1r1ux, b1r1uy, f1r1ux, f1r1uy, x, y) ? 4 : 0;
        delta += isCw(f1r1ux, f1r1uy, f1l1ux, f1l1uy, x, y) ? 8 : 0;
        var dir = 0;
        dir += isCw(0, 0, brux - flux, bruy - fluy, x1 - x, y1 - y) ? 1 : 0;
        dir += isCw(0, 0, blux - frux, bluy - fruy, x1 - x, y1 - y) ? 2 : 0;
        switch (delta) {
        case 12:
            switch (dir) {
            case 0:
                return 'B';
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return "B'";
                break;
            default:
                break;
            }
            break;
        case 13:
            switch (dir) {
            case 0:
                return 'B';
                break;
            case 1:
                return "MRL'";
                break;
            case 2:
                return 'MRL';
                break;
            case 3:
                return "B'";
                break;
            default:
                break;
            }
            break;
        case 9:
            switch (dir) {
            case 0:
                return 'B';
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return "B'";
                break;
            default:
                break;
            }
            break;
        case 14:
            switch (dir) {
            case 0:
                return "MFB'";
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return 'MFB';
                break;
            default:
                break;
            }
            break;
        case 15:
            switch (dir) {
            case 0:
                return 'BF';
                break;
            case 1:
                return 'LR';
                break;
            case 2:
                return 'RL';
                break;
            case 3:
                return 'FB';
                break;
            default:
                break;
            }
            break;
        case 11:
            switch (dir) {
            case 0:
                return "MFB'";
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return 'MFB';
                break;
            default:
                break;
            }
            break;
        case 6:
            switch (dir) {
            case 0:
                return "F'";
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return 'F';
                break;
            default:
                break;
            }
            break;
        case 7:
            switch (dir) {
            case 0:
                return "F'";
                break;
            case 1:
                return "MRL'";
                break;
            case 2:
                return 'MRL';
                break;
            case 3:
                return 'F';
                break;
            default:
                break;
            }
            break;
        case 3:
            switch (dir) {
            case 0:
                return "F'";
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return 'F';
                break;
            default:
                break;
            }
            break;
        default:
            return '';
        }
    }
    if (isCw(fldx, fldy, frdx, frdy, brdx, brdy) &&
        isCw(fldx, fldy, frdx, frdy, x, y) &&
        isCw(frdx, frdy, brdx, brdy, x, y) &&
        isCw(brdx, brdy, bldx, bldy, x, y) &&
        isCw(bldx, bldy, fldx, fldy, x, y)) {
        var f1l1dx = F1L1D.to2Dx(),
        f1l1dy = F1L1D.to2Dy(),
        f1r1dx = F1R1D.to2Dx(),
        f1r1dy = F1R1D.to2Dy(),
        b1l1dx = B1L1D.to2Dx(),
        b1l1dy = B1L1D.to2Dy(),
        b1r1dx = B1R1D.to2Dx(),
        b1r1dy = B1R1D.to2Dy();
        var delta = 0;
        delta += isCw(b1l1dx, b1l1dy, f1l1dx, f1l1dy, x, y) ? 1 : 0;
        delta += isCw(f1l1dx, f1l1dy, f1r1dx, f1r1dy, x, y) ? 2 : 0;
        delta += isCw(f1r1dx, f1r1dy, b1r1dx, b1r1dy, x, y) ? 4 : 0;
        delta += isCw(b1r1dx, b1r1dy, b1l1dx, b1l1dy, x, y) ? 8 : 0;
        var dir = 0;
        dir += isCw(0, 0, frdx - bldx, frdy - bldy, x1 - x, y1 - y) ? 1 : 0;
        dir += isCw(0, 0, fldx - brdx, fldy - brdy, x1 - x, y1 - y) ? 2 : 0;
        switch (delta) {
        case 12:
            switch (dir) {
            case 0:
                return 'F';
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return "F'";
                break;
            default:
                break;
            }
            break;
        case 13:
            switch (dir) {
            case 0:
                return 'F';
                break;
            case 1:
                return "MRL'";
                break;
            case 2:
                return 'MRL';
                break;
            case 3:
                return "F'";
                break;
            default:
                break;
            }
            break;
        case 9:
            switch (dir) {
            case 0:
                return 'F';
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return "F'";
                break;
            default:
                break;
            }
            break;
        case 14:
            switch (dir) {
            case 0:
                return 'MFB';
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return "MFB'";
                break;
            default:
                break;
            }
            break;
        case 15:
            switch (dir) {
            case 0:
                return 'FB';
                break;
            case 1:
                return 'LR';
                break;
            case 2:
                return 'RL';
                break;
            case 3:
                return 'BF';
                break;
            default:
                break;
            }
            break;
        case 11:
            switch (dir) {
            case 0:
                return 'MFB';
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return "MFB'";
                break;
            default:
                break;
            }
            break;
        case 6:
            switch (dir) {
            case 0:
                return "B'";
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return 'B';
                break;
            default:
                break;
            }
            break;
        case 7:
            switch (dir) {
            case 0:
                return "B'";
                break;
            case 1:
                return "MRL'";
                break;
            case 2:
                return 'MRL';
                break;
            case 3:
                return 'B';
                break;
            default:
                break;
            }
            break;
        case 3:
            switch (dir) {
            case 0:
                return "B'";
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return 'B';
                break;
            default:
                break;
            }
            break;
        default:
            return '';
        }
    }
    if (isCw(flux, fluy, frux, fruy, frdx, frdy) &&
        isCw(flux, fluy, frux, fruy, x, y) &&
        isCw(frux, fruy, frdx, frdy, x, y) &&
        isCw(frdx, frdy, fldx, fldy, x, y) &&
        isCw(fldx, fldy, flux, fluy, x, y)) {
        var fl1d1x = FL1D1.to2Dx(),
        fl1d1y = FL1D1.to2Dy(),
        fr1d1x = FR1D1.to2Dx(),
        fr1d1y = FR1D1.to2Dy(),
        fl1u1x = FL1U1.to2Dx(),
        fl1u1y = FL1U1.to2Dy(),
        fr1u1x = FR1U1.to2Dx(),
        fr1u1y = FR1U1.to2Dy();
        var delta = 0;
        delta += isCw(fl1d1x, fl1d1y, fl1u1x, fl1u1y, x, y) ? 1 : 0;
        delta += isCw(fl1u1x, fl1u1y, fr1u1x, fr1u1y, x, y) ? 2 : 0;
        delta += isCw(fr1u1x, fr1u1y, fr1d1x, fr1d1y, x, y) ? 4 : 0;
        delta += isCw(fr1d1x, fr1d1y, fl1d1x, fl1d1y, x, y) ? 8 : 0;
        var dir = 0;
        dir += isCw(0, 0, frux - fldx, fruy - fldy, x1 - x, y1 - y) ? 1 : 0;
        dir += isCw(0, 0, flux - frdx, fluy - frdy, x1 - x, y1 - y) ? 2 : 0;
        switch (delta) {
        case 12:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 13:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return "MRL'";
                break;
            case 2:
                return 'MRL';
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 9:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 14:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 15:
            switch (dir) {
            case 0:
                return 'UD';
                break;
            case 1:
                return 'LR';
                break;
            case 2:
                return 'RL';
                break;
            case 3:
                return 'DU';
                break;
            default:
                break;
            }
            break;
        case 11:
            switch (dir) {
            case 0:
                return 'MUD';
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return "MUD'";
                break;
            default:
                break;
            }
            break;
        case 6:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return 'L';
                break;
            case 2:
                return "L'";
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        case 7:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return "MRL'";
                break;
            case 2:
                return 'MRL';
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        case 3:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return "R'";
                break;
            case 2:
                return 'R';
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        default:
            return '';
        }
    }
    if (isCw(brux, bruy, blux, bluy, bldx, bldy) &&
        isCw(brux, bruy, blux, bluy, x, y) &&
        isCw(blux, bluy, bldx, bldy, x, y) &&
        isCw(bldx, bldy, brdx, brdy, x, y) &&
        isCw(brdx, brdy, brux, bruy, x, y)) {
        var bl1d1x = BL1D1.to2Dx(),
        bl1d1y = BL1D1.to2Dy(),
        br1d1x = BR1D1.to2Dx(),
        br1d1y = BR1D1.to2Dy(),
        bl1u1x = BL1U1.to2Dx(),
        bl1u1y = BL1U1.to2Dy(),
        br1u1x = BR1U1.to2Dx(),
        br1u1y = BR1U1.to2Dy();
        var delta = 0;
        delta += isCw(br1d1x, br1d1y, br1u1x, br1u1y, x, y) ? 1 : 0;
        delta += isCw(br1u1x, br1u1y, bl1u1x, bl1u1y, x, y) ? 2 : 0;
        delta += isCw(bl1u1x, bl1u1y, bl1d1x, bl1d1y, x, y) ? 4 : 0;
        delta += isCw(bl1d1x, bl1d1y, br1d1x, br1d1y, x, y) ? 8 : 0;
        var dir = 0;
        dir += isCw(0, 0, blux - brdx, bluy - brdy, x1 - x, y1 - y) ? 1 : 0;
        dir += isCw(0, 0, brux - bldx, bruy - bldy, x1 - x, y1 - y) ? 2 : 0;
        switch (delta) {
        case 12:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return 'R';
                break;
            case 2:
                return "R'";
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 13:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return 'MRL';
                break;
            case 2:
                return "MRL'";
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 9:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return "L'";
                break;
            case 2:
                return 'L';
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 14:
            switch (dir) {
            case 0:
                return 'MUD';
                break;
            case 1:
                return 'R';
                break;
            case 2:
                return "R'";
                break;
            case 3:
                return "MUD'";
                break;
            default:
                break;
            }
            break;
        case 15:
            switch (dir) {
            case 0:
                return 'UD';
                break;
            case 1:
                return 'RL';
                break;
            case 2:
                return 'LR';
                break;
            case 3:
                return 'DU';
                break;
            default:
                break;
            }
            break;
        case 11:
            switch (dir) {
            case 0:
                return 'MUD';
                break;
            case 1:
                return "L'";
                break;
            case 2:
                return 'L';
                break;
            case 3:
                return "MUD'";
                break;
            default:
                break;
            }
            break;
        case 6:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return 'R';
                break;
            case 2:
                return "R'";
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        case 7:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return 'MRL';
                break;
            case 2:
                return "MRL'";
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        case 3:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return "L'";
                break;
            case 2:
                return 'L';
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        default:
            return '';
        }
    }
    if (isCw(flux, fluy, fldx, fldy, bldx, bldy) &&
        isCw(flux, fluy, fldx, fldy, x, y) &&
        isCw(fldx, fldy, bldx, bldy, x, y) &&
        isCw(bldx, bldy, blux, bluy, x, y) &&
        isCw(blux, bluy, flux, fluy, x, y)) {
        var b1lu1x = B1LU1.to2Dx(),
        b1lu1y = B1LU1.to2Dy(),
        f1lu1x = F1LU1.to2Dx(),
        f1lu1y = F1LU1.to2Dy(),
        b1ld1x = B1LD1.to2Dx(),
        b1ld1y = B1LD1.to2Dy(),
        f1ld1x = F1LD1.to2Dx(),
        f1ld1y = F1LD1.to2Dy();
        var delta = 0;
        delta += isCw(b1ld1x, b1ld1y, b1lu1x, b1lu1y, x, y) ? 1 : 0;
        delta += isCw(b1lu1x, b1lu1y, f1lu1x, f1lu1y, x, y) ? 2 : 0;
        delta += isCw(f1lu1x, f1lu1y, f1ld1x, f1ld1y, x, y) ? 4 : 0;
        delta += isCw(f1ld1x, f1ld1y, b1ld1x, b1ld1y, x, y) ? 8 : 0;
        var dir = 0;
        dir += isCw(0, 0, flux - bldx, fluy - bldy, x1 - x, y1 - y) ? 1 : 0;
        dir += isCw(0, 0, blux - fldx, bluy - fldy, x1 - x, y1 - y) ? 2 : 0;
        switch (delta) {
        case 12:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return 'B';
                break;
            case 2:
                return "B'";
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 13:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return "MFB'";
                break;
            case 2:
                return 'MFB';
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 9:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return "F'";
                break;
            case 2:
                return 'F';
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 14:
            switch (dir) {
            case 0:
                return 'MUD';
                break;
            case 1:
                return 'B';
                break;
            case 2:
                return "B'";
                break;
            case 3:
                return "MUD'";
                break;
            default:
                break;
            }
            break;
        case 15:
            switch (dir) {
            case 0:
                return 'UD';
                break;
            case 1:
                return 'BF';
                break;
            case 2:
                return 'FB';
                break;
            case 3:
                return 'DU';
                break;
            default:
                break;
            }
            break;
        case 11:
            switch (dir) {
            case 0:
                return 'MUD';
                break;
            case 1:
                return "F'";
                break;
            case 2:
                return 'F';
                break;
            case 3:
                return "MUD'";
                break;
            default:
                break;
            }
            break;
        case 6:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return 'B';
                break;
            case 2:
                return "B'";
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        case 7:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return "MFB'";
                break;
            case 2:
                return 'MFB';
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        case 3:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return "F'";
                break;
            case 2:
                return 'F';
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        default:
            return '';
        }
    }
    if (isCw(frux, fruy, brux, bruy, brdx, brdy) &&
        isCw(frux, fruy, brux, bruy, x, y) &&
        isCw(brux, bruy, brdx, brdy, x, y) &&
        isCw(brdx, brdy, frdx, frdy, x, y) &&
        isCw(frdx, frdy, frux, fruy, x, y)) {
        var b1ru1x = B1RU1.to2Dx(),
        b1ru1y = B1RU1.to2Dy(),
        f1ru1x = F1RU1.to2Dx(),
        f1ru1y = F1RU1.to2Dy(),
        b1rd1x = B1RD1.to2Dx(),
        b1rd1y = B1RD1.to2Dy(),
        f1rd1x = F1RD1.to2Dx(),
        f1rd1y = F1RD1.to2Dy();
        var delta = 0;
        delta += isCw(f1rd1x, f1rd1y, f1ru1x, f1ru1y, x, y) ? 1 : 0;
        delta += isCw(f1ru1x, f1ru1y, b1ru1x, b1ru1y, x, y) ? 2 : 0;
        delta += isCw(b1ru1x, b1ru1y, b1rd1x, b1rd1y, x, y) ? 4 : 0;
        delta += isCw(b1rd1x, b1rd1y, f1rd1x, f1rd1y, x, y) ? 8 : 0;
        var dir = 0;
        dir += isCw(0, 0, brux - frdx, bruy - frdy, x1 - x, y1 - y) ? 1 : 0;
        dir += isCw(0, 0, frux - brdx, fruy - brdy, x1 - x, y1 - y) ? 2 : 0;
        switch (delta) {
        case 12:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return 'F';
                break;
            case 2:
                return "F'";
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 13:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return 'MFB';
                break;
            case 2:
                return "MFB'";
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 9:
            switch (dir) {
            case 0:
                return 'U';
                break;
            case 1:
                return "B'";
                break;
            case 2:
                return 'B';
                break;
            case 3:
                return "U'";
                break;
            default:
                break;
            }
            break;
        case 14:
            switch (dir) {
            case 0:
                return 'MUD';
                break;
            case 1:
                return 'F';
                break;
            case 2:
                return "F'";
                break;
            case 3:
                return "MUD'";
                break;
            default:
                break;
            }
            break;
        case 15:
            switch (dir) {
            case 0:
                return 'UD';
                break;
            case 1:
                return 'FB';
                break;
            case 2:
                return 'BF';
                break;
            case 3:
                return 'DU';
                break;
            default:
                break;
            }
            break;
        case 11:
            switch (dir) {
            case 0:
                return 'MUD';
                break;
            case 1:
                return "B'";
                break;
            case 2:
                return 'B';
                break;
            case 3:
                return "MUD'";
                break;
            default:
                break;
            }
            break;
        case 6:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return 'F';
                break;
            case 2:
                return "F'";
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        case 7:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return 'MFB';
                break;
            case 2:
                return "MFB'";
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        case 3:
            switch (dir) {
            case 0:
                return "D'";
                break;
            case 1:
                return "B'";
                break;
            case 2:
                return 'B';
                break;
            case 3:
                return 'D';
                break;
            default:
                break;
            }
            break;
        default:
            return '';
        }
    }
    return '';
}
function isOutOFCube(x, y) {
    x -= OPX;
    y -= OPY;
    var flux = FLU.to2Dx(),
    fluy = FLU.to2Dy(),
    fldx = FLD.to2Dx(),
    fldy = FLD.to2Dy(),
    frux = FRU.to2Dx(),
    fruy = FRU.to2Dy(),
    frdx = FRD.to2Dx(),
    frdy = FRD.to2Dy(),
    blux = BLU.to2Dx(),
    bluy = BLU.to2Dy(),
    bldx = BLD.to2Dx(),
    bldy = BLD.to2Dy(),
    brux = BRU.to2Dx(),
    bruy = BRU.to2Dy(),
    brdx = BRD.to2Dx(),
    brdy = BRD.to2Dy();
    if (isCw(flux, fluy, blux, bluy, brux, bruy) &&
        isCw(flux, fluy, blux, bluy, x, y) &&
        isCw(blux, bluy, brux, bruy, x, y) &&
        isCw(brux, bruy, frux, fruy, x, y) &&
        isCw(frux, fruy, flux, fluy, x, y)) {
        return false;
    }
    if (isCw(fldx, fldy, frdx, frdy, brdx, brdy) &&
        isCw(fldx, fldy, frdx, frdy, x, y) &&
        isCw(frdx, frdy, brdx, brdy, x, y) &&
        isCw(brdx, brdy, bldx, bldy, x, y) &&
        isCw(bldx, bldy, fldx, fldy, x, y)) {
        return false;
    }
    if (isCw(flux, fluy, frux, fruy, frdx, frdy) &&
        isCw(flux, fluy, frux, fruy, x, y) &&
        isCw(frux, fruy, frdx, frdy, x, y) &&
        isCw(frdx, frdy, fldx, fldy, x, y) &&
        isCw(fldx, fldy, flux, fluy, x, y)) {
        return false;
    }
    if (isCw(brux, bruy, blux, bluy, bldx, bldy) &&
        isCw(brux, bruy, blux, bluy, x, y) &&
        isCw(blux, bluy, bldx, bldy, x, y) &&
        isCw(bldx, bldy, brdx, brdy, x, y) &&
        isCw(brdx, brdy, brux, bruy, x, y)) {
        return false;
    }
    if (isCw(flux, fluy, fldx, fldy, bldx, bldy) &&
        isCw(flux, fluy, fldx, fldy, x, y) &&
        isCw(fldx, fldy, bldx, bldy, x, y) &&
        isCw(bldx, bldy, blux, bluy, x, y) &&
        isCw(blux, bluy, flux, fluy, x, y)) {
        return false;
    }
    if (isCw(frux, fruy, brux, bruy, brdx, brdy) &&
        isCw(frux, fruy, brux, bruy, x, y) &&
        isCw(brux, bruy, brdx, brdy, x, y) &&
        isCw(brdx, brdy, frdx, frdy, x, y) &&
        isCw(frdx, frdy, frux, fruy, x, y)) {
        return false;
    }
    return true;
}
function drSh(_c, _flu, _fru, _fld, _frd, _blu, _bru, _bld, _brd) {
    _c.save();
    _c.fillStyle = '#222222';
    var _p1 = p(_flu.x, _flu.y, -h),
    _p2 = p(_fru.x, _fru.y, -h),
    _p3 = p(_fld.x, _fld.y, -h),
    _p4 = p(_frd.x, _frd.y, -h),
    _p5 = p(_blu.x, _blu.y, -h),
    _p6 = p(_bru.x, _bru.y, -h),
    _p7 = p(_bld.x, _bld.y, -h),
    _p8 = p(_brd.x, _brd.y, -h);
    var _p1x = _p1.to2Dx(),
    _p1y = _p1.to2Dy(),
    _p2x = _p2.to2Dx(),
    _p2y = _p2.to2Dy(),
    _p3x = _p3.to2Dx(),
    _p3y = _p3.to2Dy(),
    _p4x = _p4.to2Dx(),
    _p4y = _p4.to2Dy(),
    _p5x = _p5.to2Dx(),
    _p5y = _p5.to2Dy(),
    _p6x = _p6.to2Dx(),
    _p6y = _p6.to2Dy(),
    _p7x = _p7.to2Dx(),
    _p7y = _p7.to2Dy(),
    _p8x = _p8.to2Dx(),
    _p8y = _p8.to2Dy();
    drPly(_c, [[_p1x, _p1y], [_p2x, _p2y], [_p4x, _p4y], [_p8x, _p8y],
        [_p7x, _p7y], [_p5x, _p5y]], false);
    drPly(_c, [[_p1x, _p1y], [_p3x, _p3y], [_p4x, _p4y], [_p8x, _p8y],
        [_p6x, _p6y], [_p5x, _p5y]], false);
    drPly(_c, [[_p1x, _p1y], [_p3x, _p3y], [_p7x, _p7y], [_p8x, _p8y],
        [_p6x, _p6y], [_p2x, _p2y]], false);
    drPly(_c, [[_p2x, _p2y], [_p4x, _p4y], [_p3x, _p3y], [_p7x, _p7y],
        [_p5x, _p5y], [_p6x, _p6y]], false);
    _c.restore();
}
var RANDOM = 0;
function randomize(setp) {
    if (setp == 0) {
        resetView(500);
        return;
    }
    RANDOM = --setp;

    switch (Math.floor(12 * Math.random())) {
        case 0:
            move('U', 1, 200, function() {
                    restoreSt();
                    tU();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 1:
            move('U', -1, 200, function() {
                    restoreSt();
                    tU1();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 2:
            move('D', 1, 200, function() {
                    restoreSt();
                    tD1();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 3:
            move('D', -1, 200, function() {
                    restoreSt();
                    tD();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 4:
            move('F', 1, 200, function() {
                    restoreSt();
                    tF();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 5:
            move('F', -1, 200, function() {
                    restoreSt();
                    tF1();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 6:
            move('B', 1, 200, function() {
                    restoreSt();
                    tB1();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 7:
            move('B', -1, 200, function() {
                    restoreSt();
                    tB();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 8:
            move('R', 1, 200, function() {
                    restoreSt();
                    tR();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 9:
            move('R', -1, 200, function() {
                    restoreSt();
                    tR1();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 10:
            move('L', 1, 200, function() {
                    restoreSt();
                    tL1();
                    dr();
                    randomize(RANDOM);
                });
            break;
        case 11:
            move('L', -1, 200, function() {
                    restoreSt();
                    tL();
                    dr();
                    randomize(RANDOM);
                });
            break;
    }
}
function init() {
    for (var i = 0; i < 50; i++) {
        switch (Math.floor(12 * Math.random())) {
            case 0:
                tU();
                break;
            case 1:
                tU1();
                break;
            case 2:
                tD1();
                break;
            case 3:
                tD();
                break;
            case 4:
                tF();
                break;
            case 5:
                tF1();
                break;
            case 6:
                tB1();
                break;
            case 7:
                tB();
                break;
            case 8:
                tR();
                break;
            case 9:
                tR1();
                break;
            case 10:
                tL1();
                break;
            case 11:
                tL();
                break;
        }
    }
    zRo(-30);
    xRo(-20);
    saveSt();
    VIEW.w = -30;
    VIEW.h = -10;
    dr();
    var canvas = document.getElementById('canvas');
    canvas.onmousedown = startDrug;
    canvas.onmouseup = endDrug;
}

