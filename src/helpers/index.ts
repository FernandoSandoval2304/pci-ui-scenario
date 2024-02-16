import { Row } from "../models";

export const parseRows = (data: any[]): Row[] => {
    return data.map(item => ({
        designation: item.designation,
        discovery_date: new Date(item.discovery_date),
        h_mag: parseFloat(item.h_mag ?? 0) ,
        moid_au: parseFloat(item.moid_au),
        q_au_1: parseFloat(item.q_au_1),
        q_au_2: parseFloat(item.q_au_2 ?? 0),
        period_yr: parseFloat(item.period_yr ?? 0),
        i_deg: parseFloat(item.i_deg),
        pha: item.pha === "Y" ? "Yes" : item.pha === "N" ? "No" : "",
        orbit_class: item.orbit_class
    }));
};