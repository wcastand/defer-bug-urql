import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useQuery } from "urql";
import { useState } from "react";
import { graphql } from "../../graphql";

const QueryDocument = graphql(`
  query Query {
    fastField
    search {
      __typename
      ... on Book {
        title
      }
      ... on Author {
        name
      }
    }
  }
`);

function Queryioes() {
	const [result] = useQuery({ query: QueryDocument });

	return (
		<View>
			<Text>
				{result.data?.search.__typename === "Author"
					? result.data.search.name
					: result.data?.search.title}
			</Text>
			<Text>{result.data?.fastField ?? "-"}</Text>
		</View>
	);
}

export default function TabOneScreen() {
	const [s, setS] = useState(true);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab One</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<EditScreenInfo path="app/(tabs)/index.tsx" />
			<Pressable onPress={() => setS((s) => !s)}>
				<Text>Fake</Text>
			</Pressable>
			{s ? <Queryioes /> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
