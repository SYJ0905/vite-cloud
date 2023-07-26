import { shallowMount } from '@vue/test-utils';
import Counter from '../template/components/Counter.vue';

test('初始標題文字 = 當前點擊次數0', () => {
  const wrapper = shallowMount(Counter);

  const title = wrapper.find('[data-testId="currentCounter"]');
  expect(title.text()).toBe('當前點擊次數0');
});

test('點擊一次後 = 當前點擊次數1', async () => {
  const wrapper = shallowMount(Counter);

  const incrementButton = wrapper.find('[data-testId="addCounter"]');
  await incrementButton.trigger('click');

  const title = wrapper.find('[data-testId="currentCounter"]');
  expect(title.text()).toBe('當前點擊次數1');
});
