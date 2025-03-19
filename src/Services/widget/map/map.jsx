import { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './map.css';

const mapStyle = {
	width: '100%',
	height: '400px',
};

const defaultCenter = {
	lat: -23.55052,
	lng: -46.633308,
};

const Map = () => {
	const [center, setCenter] = useState(defaultCenter);
	const [zoomValue, setZoomValue] = useState(15);
	const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
	const [trafficLayer, setTrafficLayer] = useState(null);
	const [isTrafficVisible, setIsTrafficVisible] = useState(false);
	const [isGeolocationUpdated, setIsGeolocationUpdated] = useState(false);
	const [userPosition, setUserPosition] = useState(null);

	const mapRef = useRef(null);
	const userMarkerRef = useRef(null);

	const getGeolocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCenter({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					setUserPosition({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					setIsGeolocationUpdated(true);
				},
				(error) => {
					console.error('Erro ao obter localização:', error);
					setIsGeolocationUpdated(false);
				},
				{
					enableHighAccuracy: true,
				}
			);
		} else {
			console.error('Geolocalização não é suportada pelo navegador.');
			setIsGeolocationUpdated(false);
		}
	};

	useEffect(() => {
		getGeolocation();
	}, []);

	useEffect(() => {
		if (googleMapsLoaded && trafficLayer && mapRef.current) {
			if (isTrafficVisible) {
				trafficLayer.setMap(mapRef.current);
			} else {
				trafficLayer.setMap(null);
			}
		}
	}, [googleMapsLoaded, trafficLayer, isTrafficVisible]);

	const handleCentralizeClick = () => {
		getGeolocation();
		setZoomValue(16);
	};

	const handleGoogleMapsLoad = (map) => {
		setGoogleMapsLoaded(true);
		const traffic = new window.google.maps.TrafficLayer();
		setTrafficLayer(traffic);
		mapRef.current = map;
	};

	const toggleTrafficLayer = () => {
		setIsTrafficVisible((prev) => !prev);
	};

	const handleMapDragEnd = () => {
		if (mapRef.current) {
			const newCenter = mapRef.current.getCenter();
			const currentCenter = {
				lat: center.lat,
				lng: center.lng,
			};
			if (newCenter.lat() !== currentCenter.lat || newCenter.lng() !== currentCenter.lng) {
				setIsGeolocationUpdated(false);
			} else {
				setIsGeolocationUpdated(true);
			}
		}
	};

	const getUserMarkerIcon = () => {
		return {
			path: window.google.maps.SymbolPath.CIRCLE,
			fillColor: '#4285F4',
			fillOpacity: 1,
			scale: 10,
			strokeColor: '#FFFFFF',
			strokeWeight: 2,
		};
	};

	return (
		<LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY} onLoad={handleGoogleMapsLoad}>
			{googleMapsLoaded && (
				<div className='map' style={{ position: 'relative' }}>
					<GoogleMap
						mapContainerStyle={mapStyle}
						center={center}
						zoom={zoomValue}
						options={{
							zoomControl: true,
							cameraControl: false,
							fullscreenControl: false,
						}}
						onLoad={handleGoogleMapsLoad}
						onDragEnd={handleMapDragEnd}
					>
						{userPosition && (
							<Marker
								position={userPosition}
								icon={getUserMarkerIcon()}
								ref={userMarkerRef}
								title="Sua localização atual"
							/>
						)}
					</GoogleMap>

					<button
						className="gps"
						onClick={handleCentralizeClick}
						style={{ color: isGeolocationUpdated ? '#4285F4' : 'rgba(0, 0, 0, 0.7)' }}
					>
						<i className="fa-solid fa-location-crosshairs" />
					</button>
					<button
						className="toggle-traffic"
						onClick={toggleTrafficLayer}
						style={{ color: isTrafficVisible ? '#4285F4' : 'rgba(0, 0, 0, 0.7)' }}
					>
						<i className="fa-solid fa-traffic-light" />
					</button>
				</div>
			)}
		</LoadScript>
	);
};

export default Map;
