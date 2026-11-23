import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { 
  Filter, 
  MapPin, 
  AlertTriangle, 
  Layers, 
  CloudSun, 
  TrendingUp, 
  Radio, 
  Calendar,
  X,
  Info
} from 'lucide-react';
import { OfficerHeader } from '../../components/layout/OfficerHeader';
import { OfficerSidebar } from '../../components/layout/OfficerSidebar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { MAHARASHTRA_DISTRICT_HOTSPOTS, MAHARASHTRA_CENTER } from '../../data/maharashtraGeo';
import { INDIA_STATES_DATA, getStateInfo } from '../../data/indiaLocations';
import { MaharashtraDistrictHotspot } from '../../types';

// Helper component to center map on selection
function ChangeMapView({ coords, zoom }: { coords: [number, number]; zoom?: number }) {
  const map = useMap();
  map.setView(coords, zoom || map.getZoom());
  return null;
}

export const OfficerMapPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [spots, setSpots] = useState<MaharashtraDistrictHotspot[]>(MAHARASHTRA_DISTRICT_HOTSPOTS);
  const [selectedSpot, setSelectedSpot] = useState<MaharashtraDistrictHotspot | null>(MAHARASHTRA_DISTRICT_HOTSPOTS[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([MAHARASHTRA_CENTER.lat, MAHARASHTRA_CENTER.lng]);
  const [mapZoom, setMapZoom] = useState<number>(7);

  // Filter States
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const stInfo = getStateInfo(stateName);
    setMapCenter([stInfo.center.lat, stInfo.center.lng]);
    setMapZoom(7);

    if (stateName === 'Maharashtra') {
      setSpots(MAHARASHTRA_DISTRICT_HOTSPOTS);
      setSelectedSpot(MAHARASHTRA_DISTRICT_HOTSPOTS[0]);
    } else {
      // Generate state hotspots dynamically
      const stateSpots: MaharashtraDistrictHotspot[] = stInfo.districts.map((d, idx) => ({
        district: d.name,
        marathiName: d.nameMr,
        lat: d.lat,
        lng: d.lng,
        riskLevel: idx % 3 === 0 ? 'high' : idx % 3 === 1 ? 'medium' : 'low',
        activeReportsCount: Math.floor(15 + (idx * 7) % 30),
        confirmedCasesCount: Math.floor(10 + (idx * 5) % 20),
        primaryCrop: idx % 2 === 0 ? 'Wheat / Mustard' : 'Cotton / Pulses',
        prevalentDisease: idx % 2 === 0 ? 'Yellow Rust / Aphids' : 'Blight / Root Rot',
        recentWeather: 'Seasonal Humidity (65%), Moderate Winds',
        trend: idx % 2 === 0 ? 'increasing' : 'stable',
        talukasHighRisk: [`${d.name} Rural`, `${d.name} North`],
        isDemoData: true
      }));
      setSpots(stateSpots);
      setSelectedSpot(stateSpots[0] || null);
    }
  };

  const filteredSpots = spots.filter(spot => {
    if (filterCrop !== 'all' && !spot.primaryCrop.toLowerCase().includes(filterCrop.toLowerCase())) {
      return false;
    }
    if (filterRisk !== 'all' && spot.riskLevel !== filterRisk) {
      return false;
    }
    return true;
  });

  const getMarkerColor = (risk: string) => {
    switch (risk) {
      case 'severe':
        return '#D9534F'; // Red
      case 'high':
        return '#F49342'; // Orange
      case 'medium':
        return '#F4B942'; // Yellow
      case 'low':
      default:
        return '#329568'; // Green
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <OfficerHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:block">
          <OfficerSidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 space-y-4 max-w-7xl mx-auto w-full flex flex-col">
          {/* Header & Filter Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-card border border-[#DDE7DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#164B35]">
                GIS फसल स्वास्थ्य एवं रोग प्रसार मानचित्र
              </h1>
              <p className="text-xs text-[#5F6F65]">
                अखिल भारतीय राज्य व जिला स्तरीय निगरानी क्लस्टर्स (Pan-India Hotspots & Disease Tracking)
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* State Filter */}
              <div className="flex items-center space-x-1.5 text-xs bg-[#F8F7F0] px-3 py-1.5 rounded-xl border border-[#DDE7DF]">
                <MapPin size={13} className="text-[#287A50]" />
                <span className="font-bold text-[#5F6F65]">राज्य:</span>
                <select
                  value={selectedState}
                  onChange={e => handleStateChange(e.target.value)}
                  className="bg-transparent font-bold text-[#164B35] focus:outline-none"
                >
                  {INDIA_STATES_DATA.map(st => (
                    <option key={st.name} value={st.name}>
                      {st.name} ({st.nameHi})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-1.5 text-xs bg-[#F8F7F0] px-3 py-1.5 rounded-xl border border-[#DDE7DF]">
                <Filter size={13} className="text-[#287A50]" />
                <span className="font-bold text-[#5F6F65]">फसल:</span>
                <select
                  value={filterCrop}
                  onChange={e => setFilterCrop(e.target.value)}
                  className="bg-transparent font-bold text-[#164B35] focus:outline-none"
                >
                  <option value="all">सभी फसलें (All)</option>
                  <option value="Tomato">टमाटर (Tomato)</option>
                  <option value="Cotton">कपास (Cotton)</option>
                  <option value="Soybean">सोयाबीन (Soybean)</option>
                  <option value="Onion">प्याज (Onion)</option>
                  <option value="Wheat">गेहूं (Wheat)</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5 text-xs bg-[#F8F7F0] px-3 py-1.5 rounded-xl border border-[#DDE7DF]">
                <span className="font-bold text-[#5F6F65]">जोखिम:</span>
                <select
                  value={filterRisk}
                  onChange={e => setFilterRisk(e.target.value)}
                  className="bg-transparent font-bold text-[#164B35] focus:outline-none"
                >
                  <option value="all">सभी स्तर</option>
                  <option value="severe">🔴 Severe (अति गंभीर)</option>
                  <option value="high">🟠 High (उच्च)</option>
                  <option value="medium">🟡 Medium (मध्यम)</option>
                  <option value="low">🟢 Low (सामान्य)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Map & Detail Drawer Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
            {/* Map Container */}
            <div className="lg:col-span-8 bg-white rounded-3xl overflow-hidden shadow-card border border-[#DDE7DF] h-[520px] relative z-0">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={true}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ChangeMapView coords={selectedSpot ? [selectedSpot.lat, selectedSpot.lng] : mapCenter} zoom={mapZoom} />

                {filteredSpots.map(spot => {
                  const color = getMarkerColor(spot.riskLevel);
                  const radius = spot.riskLevel === 'severe' ? 22 : spot.riskLevel === 'high' ? 18 : 14;

                  return (
                    <CircleMarker
                      key={spot.district}
                      center={[spot.lat, spot.lng]}
                      radius={radius}
                      pathOptions={{
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.65,
                        weight: 3
                      }}
                      eventHandlers={{
                        click: () => {
                          setSelectedSpot(spot);
                        }
                      }}
                    >
                      <Popup>
                        <div className="p-1 text-xs space-y-1">
                          <strong className="text-base text-[#164B35] block">
                            {spot.district} ({spot.marathiName})
                          </strong>
                          <p>मुख्य फसल: <strong>{spot.primaryCrop}</strong></p>
                          <p>संभावित समस्या: <strong>{spot.prevalentDisease}</strong></p>
                          <p>सक्रिय मामले: <strong className="text-red-600">{spot.activeReportsCount}</strong></p>
                          <button
                            onClick={() => setSelectedSpot(spot)}
                            className="bg-[#164B35] text-white px-2 py-0.5 rounded text-[10px] font-bold mt-1"
                          >
                            तपशील पहा (View Details)
                          </button>
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-[#DDE7DF] text-xs space-y-1.5">
                <span className="font-extrabold text-[11px] text-[#164B35] block uppercase">
                  जोखिम रंग संकेत (Risk Legend):
                </span>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D9534F]"></span>
                    <span>Severe (गंभीर)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F49342]"></span>
                    <span>High (उच्च)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F4B942]"></span>
                    <span>Medium (मध्यम)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#329568]"></span>
                    <span>Low (कम)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* District Detail Side Panel */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] flex flex-col justify-between">
              {selectedSpot ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-[#DDE7DF] pb-3">
                    <div>
                      <div className="flex items-center space-x-1.5 text-xs text-[#287A50] font-bold">
                        <MapPin size={14} />
                        <span>चयनित जिला हॉटस्पॉट</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#164B35] mt-1">
                        {selectedSpot.district}
                      </h3>
                      <span className="text-xs text-[#5F6F65]">
                        {selectedSpot.marathiName} संभाग
                      </span>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                        selectedSpot.riskLevel === 'severe'
                          ? 'bg-red-100 text-red-800'
                          : selectedSpot.riskLevel === 'high'
                          ? 'bg-orange-100 text-orange-800'
                          : selectedSpot.riskLevel === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {selectedSpot.riskLevel} Risk
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="bg-[#F8F7F0] p-3 rounded-2xl space-y-1">
                      <span className="text-[#5F6F65] block font-semibold">प्रभावित फसल व रोग:</span>
                      <p className="text-sm font-extrabold text-[#164B35]">
                        🌱 {selectedSpot.primaryCrop} — {selectedSpot.prevalentDisease}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#F8F7F0] p-3 rounded-2xl">
                        <span className="text-[#5F6F65] block">सक्रिय किसान रिपोर्ट्स:</span>
                        <span className="text-xl font-black text-[#164B35]">
                          {selectedSpot.activeReportsCount}
                        </span>
                        <span className="text-[10px] text-amber-700 block">सत्यापन हेतु लंबित</span>
                      </div>
                      <div className="bg-[#F8F7F0] p-3 rounded-2xl">
                        <span className="text-[#5F6F65] block">पुष्ट संक्रमण:</span>
                        <span className="text-xl font-black text-[#329568]">
                          {selectedSpot.confirmedCasesCount}
                        </span>
                        <span className="text-[10px] text-emerald-700 block">वैज्ञानिक पुष्टि</span>
                      </div>
                    </div>

                    <div className="bg-[#EAF4E9] p-3 rounded-2xl text-[#164B35] space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold">
                        <CloudSun size={15} />
                        <span>मौसम कारक (Trigger):</span>
                      </div>
                      <p className="text-xs">{selectedSpot.recentWeather}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-[#202D25] block">
                        उच्च जोखिम वाली तहसीलें (High-Risk Talukas):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedSpot.talukasHighRisk.map((taluka, ti) => (
                          <span
                            key={ti}
                            className="bg-red-50 text-red-800 border border-red-200 px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                          >
                            {taluka}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`/officer/alerts?district=${selectedSpot.district}`}
                      className="w-full bg-[#164B35] hover:bg-[#287A50] text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
                    >
                      <Radio size={14} />
                      <span>{selectedSpot.district} के किसानों को चेतावनी भेजें</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#5F6F65] text-xs">
                  नक्शे पर किसी भी जिले के सर्कल पर क्लिक करके उसका विवरण देखें।
                </div>
              )}

              <p className="text-[10px] text-[#5F6F65] text-center pt-3 border-t border-[#DDE7DF]">
                * सभी हॉटस्पॉट संख्याएं सिमुलेटेड डेमो डेटा हैं (OpenStreetMap / Leaflet)
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
