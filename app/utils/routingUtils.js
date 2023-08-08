import { clone, unset } from 'lodash'
import Router from 'next/router'
import { HIDE_LEFT_MENU_URLS } from '../constantes/consts'
import { isEmpty } from 'lodash'

const ARRAY_ELEMENTS_SEPARATOR = '-'

export const addQueryParams = async (query, removePreviousParams = false) => {
  const oldQuery = clone(Router.query)

  const adjustedQuery = {}

  Object.keys(query).forEach((key) => {
    const q = query[key]
    if (Array.isArray(q)) adjustedQuery[key] = q.join(ARRAY_ELEMENTS_SEPARATOR)
    else if (typeof q === 'string') adjustedQuery[key] = q.trim()
    else adjustedQuery[key] = q
  })

  let updatedQuery = {
    ...adjustedQuery,
  }
  if (!removePreviousParams) updatedQuery = { ...updatedQuery, ...oldQuery }

  return Router.replace({ query: updatedQuery })
}
export const removeQueryParams = async (keys) => {
  const oldQuery = clone(Router.query)
  keys.forEach((key) => {
    unset(oldQuery, key)
  })

  return Router.replace({ query: oldQuery })
}

export const getQueryParams = (
  key,
  { isArray, isArrayOfNumbers } = { isArray: false, isArrayOfNumbers: false },
) => {
  if (!key) return Router.query

  const paramValue = Router.query[key]
  if (!isArray) return paramValue

  return paramValue
    .split(ARRAY_ELEMENTS_SEPARATOR)
    .map((value) => (isArrayOfNumbers ? +value : value))
}

export const checkRouteToHideLeftMenu = () => {
  const isAccessingFormFromProjectsList =
    Router.pathname === '/projects/form' &&
    isEmpty(Router.query) &&
    !Router.asPath.includes('source=projectDetails')
    
  return (
    HIDE_LEFT_MENU_URLS.includes(Router.pathname) ||
    isAccessingFormFromProjectsList
  )
}

const SORT_ORDERS = ['asc', 'desc']
export const catchParamsFromUrl = (
  setSelectedFilters,
  skippedQueries,
  SORT_CRITERIA,
) => {
  const query = Router.query
  Object.keys(query).forEach((key) => {
    // handling page && size queries
    if (
      !Number.isNaN(+query[key]) &&
      +query[key] !== 0 &&
      !skippedQueries.includes(key)
    ) {
      setSelectedFilters((prevState) => ({
        ...prevState,
        [key]: +query[key],
      }))
    }
    // handling includeSubProjects query
    const stringToCompare = 'true'
    if (key === 'includeSubProjects') {
      const showSP = query[key] === stringToCompare
      setSelectedFilters((prevState) => ({
        ...prevState,
        includeSubProjects: showSP,
      }))
    }
    // handling sort query
    if (
      key === 'sort' &&
      query[key].includes(',') &&
      SORT_CRITERIA.includes(query[key].split(',')[0]) &&
      SORT_ORDERS.includes(query[key].split(',')[1])
    ) {
      setSelectedFilters((prevState) => ({
        ...prevState,
        sort: query[key],
      }))
    }
  })
}

export const initializeFilters = (
  setSelectedFilters,
  queriesOfTypeNotArray,
  skippedQueries,
  SORT_CRITERIA,
  debounceQuery
) => {
  const initialQueries = getQueryParams()
  const initialStateSelectedFilters = {}
  Object.keys(initialQueries).forEach((key) => {
    initialStateSelectedFilters[key] = getQueryParams(key, {
      isArray: !queriesOfTypeNotArray.includes(key),
      isArrayOfNumbers: true,
    })
  })
  setSelectedFilters((prev) => ({ ...initialStateSelectedFilters, ...prev }))
  debounceQuery(initialQueries?.query || '')
  catchParamsFromUrl(setSelectedFilters, skippedQueries, SORT_CRITERIA)
}

export const updateUrlQueryParams = (
  selectedFilters,
  queriesToHideFromUrl = [],
  removePreviousParams = true,
) => {
  const paramsToAdd = {}
  Object.keys(selectedFilters).forEach((key) => {
    if (
      !queriesToHideFromUrl.includes(key) &&
      selectedFilters[key].length !== 0
    )
      paramsToAdd[key] = selectedFilters[key]
  })
  addQueryParams(paramsToAdd, removePreviousParams)
};

export const handleNavigation = (redirectTo, includeBase = true) => {
  const asPath = ''
  const route = asPath.split('?')[0]
  const fullUrl = includeBase ? process.env.NEXT_PUBLIC_PROJECTS_BASE_URL + route: route;
  if (fullUrl === redirectTo.split('?')[0]) {
    return asPath;
  }
  return redirectTo;
}
