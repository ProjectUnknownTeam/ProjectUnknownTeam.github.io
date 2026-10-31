// Factual JSON-LD only. No invented ratings, reviews or availability claims.
export function structuredData({config, lang, kind, game, title, description, canonical, breadcrumbs}) {
  if (kind === 'notFound') return null;
  const base = config.baseUrl;
  const organization = { '@type':'Organization', '@id':`${base}#organization`, name:config.operator, url:base };
  const website = { '@type':'WebSite', '@id':`${base}#website`, name:'ProjectUnknown', alternateName:'ProjectUnknown Games', url:base, inLanguage:['en','ko'], publisher:{'@id':organization['@id']} };
  const page = { '@type':kind === 'home' && !game ? 'CollectionPage' : 'WebPage', '@id':`${canonical}#webpage`, url:canonical, name:title, description, inLanguage:lang, isPartOf:{'@id':website['@id']} };
  const graph = [organization, website, page];
  if (breadcrumbs.length > 1) {
    page.breadcrumb = {'@id':`${canonical}#breadcrumb`};
    graph.push({'@type':'BreadcrumbList','@id':page.breadcrumb['@id'], itemListElement:breadcrumbs.map((b,i)=>({'@type':'ListItem',position:i+1,name:b.name,item:b.url}))});
  }
  const gameUrl = id => new URL(`${lang === 'ko' ? 'ko/' : ''}${id}/`,base).href;
  if (game && kind === 'home') {
    const info = config.games[game];
    const gameId = `${new URL(`${game}/`,base)}#game`;
    page.mainEntity = {'@id':gameId};
    graph.push({'@type':'VideoGame','@id':gameId,name:info.name,url:gameUrl(game),description,
      image:new URL(`assets/${game === 'waddle-rush' ? 'waddle' : 'push-burst'}-feature.png`,base).href,
      genre:info.genre, gamePlatform:['Android','iOS'], publisher:{'@id':organization['@id']},
      identifier:{'@type':'PropertyValue',propertyID:'Android package name',value:info.packageName},
      sameAs:[info.googlePlay,info.appStore].filter(Boolean)});
  } else if (kind === 'home') {
    page.mainEntity = {'@type':'ItemList', itemListElement:Object.entries(config.games).map(([id,info],i)=>({'@type':'ListItem',position:i+1,name:info.name,url:gameUrl(id)}))};
  }
  return {'@context':'https://schema.org','@graph':graph};
}
