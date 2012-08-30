{set-block variable=$buffer}
{def $object_id = ezhttp('object_id','post')}
{def $size = ezhttp('size','post')}
{def $attribute = ezhttp('attribute_name','post')}
{def $node = fetch('content', 'object',hash('object_id', $object_id ))}
{def $test = 'testimage'}
{/set-block}
/{$node.data_map.$attribute.value.$size.full_path}