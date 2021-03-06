import FlightRepo from '../repositories/flightRepo.js'

export const getflights = async () => {
	const flight = await FlightRepo.selectAll()

	var result = []

	flight.rows.map((flight) => {
		var obj = new Object()

		flight.rowDescription.columns.map((el, i) => {
			obj[el.name] = flight[i]
		})
		result.push(obj)
	})

	return result
}

export const getflight = async (flightId) => {
	const flight = await FlightRepo.selectById(flightId)

	var obj = new Object()
	flight.rows.map((flight) => {
		flight.rowDescription.columns.map((el, i) => {
			obj[el.name] = flight[i]
		})
	})

	return obj
}

export const createflight = async (flightData) => {
	const newflight = {
		FlightNo: String(flightData.FlightNo),
		Airlines: String(flightData.Airlines),
		OnTime: 'OnTime' in flightData ? Boolean(flightData.OnTime) : false,
		Time: new Date(),
		Dep: String(flightData.Dep),
		Arr: String(flightData.Arr),
	}

	await FlightRepo.create(newflight)

	return newflight.FlightNo
}

/**
 * ! REQUIRE MANUAL EDITING.
 *  TODO: Find a way to Update list w/o explicitly stating. (#02)
 */

// export const updateflight = async (flightId, flightData) => {
//   const flight = await getflight(flightId);

//   if (Object.keys(flight).length === 0 && flight.constructor === Object) {
//     throw new Error("flight not found");
//   }

//   const updatedflight = {
//     name: flightData.name !== undefined ? String(flightData.name) : flight.name,
//     brand: flightData.brand !== undefined ? String(flightData.brand) : flight.brand,
//     is_premium:
//       flightData.is_premium !== undefined
//         ? Boolean(flightData.is_premium)
//         : flight.is_premium
//   };

//   FlightRepo.update(flightId, updatedflight);
// };

export const deleteflight = async (flightId) => {
	FlightRepo.delete(flightId)
}
