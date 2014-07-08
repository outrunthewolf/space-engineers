// System damage variables
// Over time, parts of systems can become damaged
// Some systems can be run for longer than others
// e.g. life support is very stable
// wepaons are not

var system = {

    // Shields
    shields: {
        title: "Shields",
        power: 0,
        power_ratio: 9, // ie, 1 unit of power is equal to 100% operational efficiency
        online: false,
        output: 0,
        operational_output: 25,
        damage: 0,
        engineer_count: 0,
        offline_warning: false,
        online_warning: true,
        stability: {
            parts: { // some parts than are responsible for breaking, and whether they damage or take offline
                "Fermi-Stabiliser": {
                    damage: 20,
                    repair_time: 20
                },
                "Ion-Pump": {
                    damage: 10,
                    repair_time: 15
                },
                "Scott-Matrix": {
                    damage: 30,
                    repair_time: 50
                }
            },
            coeff: 10, // min max coeff, 0 less likely to break, 100 more likely
        }
    },

    // Life Support
    life_support: {
        title: "Life Support",
        power: 0,
        power_ratio: 5,
        online: false,
        output: 0,
        operational_output: 25,
        damage: 0,
        engineer_count: 0,
        offline_warning: false,
        online_warning: true,
        stability: {
            parts: { // some parts than are responsible for breaking, and whether they damage or take offline
                "Air-Filter": {
                    damage: 30,
                    repair_time: 12
                },
                "Recovery-Pump": {
                    damage: 40,
                    repair_time: 23
                },
                "Gel-Pack": {
                    damage: 60,
                    repair_time: 35
                }
            },
            coeff: 5, // min max coeff, 0 less likely to break, 100 more likely
        }
    },

    // Weapons
    weapons: {
        title: "Weapons",
        power: 0,
        power_ratio: 8,
        online: false,
        output: 0,
        operational_output: 25,
        damage: 0,
        engineer_count: 0,
        offline_warning: false,
        online_warning: true,
        stability: {
            parts: { // some parts than are responsible for breaking, and whether they damage or take offline
                "Zaphod-Coil": {
                    damage: 20,
                    repair_time: 19
                },
                "Charge-Inducer": {
                    damage: 40,
                    repair_time: 50
                },
                "Coolant-Pod": {
                    damage: 10,
                    repair_time: 5
                }
            },
            coeff: 20, // min max coeff, 0 less likely to break, 100 more likely
        }
    },

    // Engines
    engines: {
        title: "Engines",
        power: 0,
        online: false,
        power_ratio: 6,
        output: 0,
        operational_output: 25,
        damage: 0,
        engineer_count: 0,
        offline_warning: false,
        online_warning: true,
        stability: {
            parts: { // some parts than are responsible for breaking, and whether they damage or take offline
                "Grid-Pack": {
                    damage: 20,
                    repair_time: 12
                },
                "Tucker-switch": {
                    damage: 50,
                    repair_time: 24
                },
                "Beam-Alignment-Container": {
                    damage: 100,
                    repair_time: 60
                }
            },
            coeff: 5, // min max coeff, 0 less likely to break, 100 more likely
        }
    }
}
