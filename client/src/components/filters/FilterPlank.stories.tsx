import type { Meta, StoryObj } from '@storybook/react';
import FilterPlank from './FilterPlank';
import styles from './FilterPlank.module.scss';
import FilterList from './FilterList';
import FilterRange from './FilterRange';
import FilterSearch from './FilterSearch';
import { genres, directorSuggestions } from './temp/items';
import rating from '../../../public/icons/rating.svg';

const meta: Meta<typeof FilterPlank> = {
    title: 'Filters/FilterPlank',
    component: FilterPlank,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FilterPlank>;

export const ListFilterPlank: Story = {
    args: {
        title: 'Жанры',
        className: styles.container__dropdown_genres,
        children: <FilterList category="genres" items={genres} />,
    },
};

export const RangeFilterPlank: Story = {
    args: {
        title: 'Рейтинг',
        className: styles.container__dropdown_narrow,
        children: <FilterRange category="ratingKp" image={rating} limit={10} step={0.1} />,
    },
};

export const SearchFilterPlank: Story = {
    args: {
        title: 'Режиссер',
        className: styles.container__dropdown_narrow,
        children: <FilterSearch category="director" suggestionsList={directorSuggestions} />,
    },
};
