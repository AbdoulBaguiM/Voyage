import Head from "next/head";
import Header from "src/components/clientSide/Header";
import NFooter from "src/components/clientSide/NFooter";
import SearchResults from "src/components/clientSide/SearchResults";
import Map from "src/components/clientSide/Map";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";
import Router from "next/router";

export default function Search({ searchResults }) {
  const router = useRouter();
  const placeholder = `${router.query.location} | ${format(
    new Date(router.query.checkIn),
    "d MMM, yy"
  )} | ${format(new Date(router.query.checkIn), "d MMM, yy")} | ${
    router.query.guests
  } guests`;
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = [...searchResults].slice(1).map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <>
    <Head>
      <title>Résultats | {process.env.APP_NAME} </title>
    </Head>
      <Header placeholder={placeholder} />
      <main>
      {/* <Map
          results={searchResults}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          viewport={viewport}
          setViewport={setViewport}
        /> */}
        <br/><br/><br/>
        <SearchResults
          setSelectedLocation={setSelectedLocation}
          results={searchResults}
          setViewport={setViewport}
        />
      </main>
      <NFooter />
    </>
  );
}

  export async function getServerSideProps({query}) {
    const searchResults = await fetch(`${process.env.API_BASE_URL}/search/`+query.location).then(
      (data) => data.json()
    );
    return {
      props: {
        searchResults,
      },
    };
}
