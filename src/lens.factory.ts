export const fetchByQuery = async (args: any) => {

  const formatSingle = (post: any) => {
    if (!post) return null;
    
    const attributes = post.metadata.attributes || [];
    
    const getAttr = (key: string) => {
      const attr: any = attributes.find((a: { key: any; }) => a.key === key);
      return attr ? attr.value : null;
    };

    return {
      id: post.id,
      author: post.author.address,
      content: post.metadata.content,
      locale: post.metadata.locale,
      attributes: {
        parent: getAttr('parent'),
        position: getAttr('position'),
        postType: getAttr('postType'),
        creationDate: getAttr('creationDate'),
        modifiedDate: getAttr('modifiedDate')
      },
      tags: post.metadata.tags
    };
  };

  const format = (posts: any[]) => {
    return posts.map((post) => formatSingle(post));
  };

  try {
    // Use regular string instead of template literal
    const query = "query GetS2SPosts($feedAddress: EvmAddress!) { posts(request: { filter: { feeds: [ { feed: $feedAddress } ] } }) { items { ... on Post { id author { address } metadata { ... on TextOnlyMetadata { content locale attributes { key value type } tags } } } } pageInfo { prev next } } }";

    const response = await fetch('https://api.testnet.lens.xyz/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: args
      })
    });

    const result = await response.json();
  
    if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        return [];
    }

    if (result.data.post != undefined) {
        return [formatSingle(result.data.post)];
    } else if (result.data.posts != undefined ) {
        return format(result.data.posts.items)
    } else {
      return []; 
    }

  } catch (error) {
    console.error("Error in runQuery:", error);
    throw error;
  }
};